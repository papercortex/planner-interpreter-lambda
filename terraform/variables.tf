variable "aws_region" {
  type        = string
  description = "The AWS region where resources will be created."
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "The name of the project. This will be used to prefix AWS resources to ensure unique naming and easier identification."
}

variable "environment" {
  type        = string
  description = "The deployment environment for the project (e.g., dev, test, prod). This helps in managing resources across different stages of development."
}

variable "application_arn" {
  type        = string
  description = "The ARN (Amazon Resource Name) of the application. This is used to uniquely identify the application across AWS services."
}

variable "papercortex_s3_bucket_name" {
  type        = string
  description = "The name of the S3 bucket used for storing papers."
}
