resource "aws_waf_ipset" "whitelist" {
	name = "BottomTimeWeb-IPWhitelist-${var.env}"

	ip_set_descriptors {
		type = "IPV4"
		value = "${var.allowed_ips}"
	}
}

resource "aws_waf_rule" "whitelist_rule" {
	depends_on = ["aws_waf_ipset.whitelist"]
	name = "BottomTimeWeb-IPWhitelistRule-${var.env}"
	metric_name = "BottomTimeWebIPWhitelistRule${var.env}"

	predicates {
		data_id = "${aws_waf_ipset.whitelist.id}"
		negated = false
		type = "IPMatch"
	}
}

resource "aws_waf_web_acl" "acl" {
	depends_on = ["aws_waf_ipset.whitelist", "aws_waf_rule.whitelist_rule"]
	name = "BottomTimeWeb-ACL-${var.env}"
	metric_name = "BottomTimeWebACL${var.env}"
	
	default_action {
		type = "BLOCK"
	}

	rules {
		action {
			type = "ALLOW"
		}

		priority = 1
		rule_id = "${aws_waf_rule.whitelist_rule.id}"
		type = "REGULAR"
	}
}
