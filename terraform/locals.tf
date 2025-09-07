locals {
  available_train_name           = "AvailableTrain"
  s3_lambda_artifact_bucket_name = "available-train-lambda-artifacts"
  s3_lambda_key_prefix           = "available-train-lambda"
  s3_lambda_key                  = "${local.s3_lambda_key_prefix}/${var.artifact_name}"
  variables = {
    AVAILABLE_TRAIN_TABLE = "AvailableTrain"
  }

  runtime = "nodejs20.x"
  handler = "index.handler"
  log_level = "info"
}