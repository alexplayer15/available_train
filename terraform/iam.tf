resource "aws_iam_role" "available_train_lambda_role" {
  name               = "${local.available_train_name}_execution_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}
resource "aws_iam_policy" "available_train_dynamodb_query_policy" {
  name   = lower("${local.available_train_name}_dynamodb_permissions")
  policy = data.aws_iam_policy_document.dynamodb_query_policy.json
}
resource "aws_iam_role_policy_attachment" "available_train_dynamodb_query_policy_attachment" {
  role       = aws_iam_role.available_train_lambda_role.name
  policy_arn = aws_iam_policy.available_train_dynamodb_query_policy.arn
}