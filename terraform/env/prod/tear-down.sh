#!/usr/bin/env bash
set -e

terraform init -from-module=../../modules/ -backend-config="key=prod.web.tfstate"
terraform destroy -auto-approve -var-file config.tfvars

rm *.tf
rm -rf .terraform/
