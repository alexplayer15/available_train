resource "aws_lambda_function" "available_train_lambda" {
  function_name = local.available_train_name
  role          = aws_iam_role.example.arn
  handler       = local.handler

  s3_bucket = local.s3_lambda_artifact_bucket_name
  s3_key    = local.s3_lambda_key

  runtime = local.runtime

  environment {
    variables = {
      ENVIRONMENT = var.environment //what could I setup in config.ts?
      LOG_LEVEL   = "info"          //what would be good settings for each env? Think about this
    }
  }

  tags = {
    Environment = var.environment
    Application = local.available_train_lambda_name
  }
}