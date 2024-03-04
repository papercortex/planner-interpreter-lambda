data "aws_bucket" "papercortex_s3_bucket" {
  bucket = var.papercortex_s3_bucket_name
}

module "planner_interpreter_lambda" {
  source            = "terraform-aws-modules/lambda/aws"
  function_name     = "${var.project_name}-${var.environment}-daily-plan-interpreter"
  description       = "Interprets the daily plan and saves it to the database."
  handler           = "lambda.handler"
  runtime           = "nodejs20.x"
  source_path       = "../dist/"
  logging_log_group = "/aws/lambda/${var.project_name}-${var.environment}/daily_plan_interpreter"
  publish           = true
  allowed_triggers = {
    AllowExecutionFromS3Bucket = {
      principal  = "s3.amazonaws.com"
      source_arn = data.aws_bucket.papercortex_s3_bucket.arn
    }
  }
  tags = merge(
    local.common_tags,
    {
      Name = "${var.project_name}-${var.environment}-daily-plan-interpreter-lambda"
    }
  )
}

resource "aws_s3_bucket_notification" "remarkable_emails_bucket_notification" {
  bucket = data.aws_bucket.papercortex_s3_bucket.id

  lambda_function {
    lambda_function_arn = module.planner_interpreter_lambda.lambda_function_arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "planner/"
  }
}
