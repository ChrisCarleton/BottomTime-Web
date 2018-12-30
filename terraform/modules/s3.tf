resource "aws_s3_bucket" "static" {
	bucket = "CCarleton-BottomTime-Web-${var.env}"
	acl = "private"
	force_destroy = true

	versioning {
		enabled = true
	}

	tags {
		Name = "Bottom Time Web Front-End"
		Env = "${var.env}"
	}
}

data "aws_iam_policy_document" "bucket_read_policy" {
	statement {
		actions = ["s3:ListBucket"]
		resources = ["${aws_s3_bucket.static.arn}"]

		principals {
			type = "AWS"
			identifiers = ["${aws_cloudfront_origin_access_identity.id.iam_arn}"]
		}
	}

	statement {
		actions = ["s3:GetObject"]
		resources = ["${aws_s3_bucket.static.arn}/*"]

		principals {
			type = "AWS"
			identifiers = ["${aws_cloudfront_origin_access_identity.id.iam_arn}"]
		}
	}
}

resource "aws_s3_bucket_policy" "static" {
	bucket = "${aws_s3_bucket.static.id}"
	policy = "${data.aws_iam_policy_document.bucket_read_policy.json}"
}
