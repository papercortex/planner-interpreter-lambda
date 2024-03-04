terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.39.0"
    }
  }

  backend "s3" {
    bucket = "terraform-state-papercortex"
    key    = "planner-interpreter-lambda/terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region
}
