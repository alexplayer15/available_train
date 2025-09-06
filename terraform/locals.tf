locals {
  available_train_name           = "AvailableTrain"
  s3_lambda_artifact_bucket_name = "AvailableTrainLambdaArtifacts"
  s3_lambda_key_prefix           = "available-train-lambda"
  s3_lambda_key                  = "${local.s3_lambda_key_prefix}/${var.artifact_name}"

  runtime = "nodejs22.x"
  handler = "index.handler"
}