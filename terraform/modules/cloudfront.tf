locals {
	s3_origin_id = "BottomTime-Origin-${var.env}"
	api_origin_id = "BottomTime-API-Origin-${var.env}"
	aliases = "${compact(list("${var.domain_name}.${var.domain_zone}", var.include_root_domain ? "${var.domain_zone}" : ""))}"
}

data "aws_acm_certificate" "tls" {
	domain = "*.${var.domain_zone}"
	most_recent = true
}

resource "aws_cloudfront_origin_access_identity" "id" {
	comment = "Origin Access Identity for Bottom Time Web App (${var.env})"
}

resource "aws_cloudfront_distribution" "main" {
	origin {
		domain_name = "${aws_s3_bucket.static.bucket_regional_domain_name}"
		origin_id = "${local.s3_origin_id}"

		s3_origin_config {
			origin_access_identity = "${aws_cloudfront_origin_access_identity.id.cloudfront_access_identity_path}"
		}
	}

	origin {
		domain_name = "${var.api_domain_name}"
		origin_id = "${local.api_origin_id}"

		custom_origin_config {
			http_port = 80
			https_port = 443
			origin_protocol_policy = "https-only"
			origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
		}
	}

	enabled = true
	is_ipv6_enabled = true
	comment = "BottomTime Web Distribution - ${var.env}"
	default_root_object = "index.html"
	http_version = "http2"

	aliases = "${local.aliases}"

	default_cache_behavior {
		allowed_methods = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"]
		cached_methods = ["GET", "HEAD"]
		target_origin_id = "${local.s3_origin_id}"
		compress = true

		forwarded_values {
			query_string = true
			headers = ["Origin"]

			cookies {
				forward = "all"
			}
		}

		viewer_protocol_policy = "redirect-to-https"
	}

	ordered_cache_behavior {
		allowed_methods = ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE", "PATCH"]
		cached_methods = ["GET", "HEAD"]
		target_origin_id = "${local.api_origin_id}"
		compress = true
		path_pattern = "api/*"
		viewer_protocol_policy = "redirect-to-https"

		forwarded_values {
			cookies {
				forward = "all"
			}

			headers = ["*"]
			query_string = true
		}
	}

	# Make sure the single-page app gets loaded for all paths.
	# The app's router will determine whether the path is good or not.
	custom_error_response {
		error_code = 404
		response_code = 200
		response_page_path = "/index.html"
	}

	restrictions {
		geo_restriction {
			restriction_type = "none"
		}
	}

	price_class = "${var.price_class}"

	tags {
		Env = "${var.env}"
	}

	viewer_certificate {
		acm_certificate_arn = "${data.aws_acm_certificate.tls.arn}"
		ssl_support_method = "sni-only"
		minimum_protocol_version = "TLSv1"
	}

	web_acl_id = "${aws_waf_web_acl.acl.id}"
}
