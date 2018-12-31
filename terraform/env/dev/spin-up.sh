#!/usr/bin/env bash
set -e

terraform init -from-module=../../modules/ -backend-config="key=dev.web.tfstate"
terraform apply -auto-approve -var-file config.tfvars

rm *.tf
rm -rf .terraform/
