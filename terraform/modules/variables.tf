variable "api_domain_name" {
	type = "string"
}

variable "domain_name" {
	type = "string"
}

variable "domain_zone" {
	type = "string"
	default = "bottomtime.ca"
}

variable "env" {
	type = "string"
}

variable "include_root_domain" {
	type = "string"
	default = false
}

variable "price_class" {
	type = "string"
	default = "PriceClass_100"
}

variable "region" {
	type = "string"
	default = "us-east-1"
}
