output "bucket" {
	value = "${aws_s3_bucket.static.id}"
}

output "distribution_id" {
	value = "${aws_cloudfront_distribution.main.id}"
}

output "site_url" {
	value = "https://${aws_route53_record.site_record.fqdn}/"
}
