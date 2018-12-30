data "aws_route53_zone" "zone" {
	name = "${var.domain_zone}."
}

resource "aws_route53_record" "site_record" {
	zone_id = "${data.aws_route53_zone.zone.zone_id}"
	name = "${var.domain_name}"
	type = "A"

	alias {
		name = "${aws_cloudfront_distribution.main.domain_name}"
		zone_id = "${aws_cloudfront_distribution.main.hosted_zone_id}"
		evaluate_target_health = false
	}
}

# Only created if var.include_root_domain == true
resource "aws_route53_record" "root_record" {
	count = "${var.include_root_domain}"
	zone_id = "${data.aws_route53_zone.zone.zone_id}"
	name = ""
	type = "A"

	alias {
		name = "${aws_cloudfront_distribution.main.domain_name}"
		zone_id = "${aws_cloudfront_distribution.main.hosted_zone_id}"
		evaluate_target_health = false
	}
}
