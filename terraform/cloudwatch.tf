resource "aws_cloudwatch_log_group" "set_log_group" {
  name              = "/aws/lambda/${local.available_train_name}"
  retention_in_days =  var.retention_in_days
}