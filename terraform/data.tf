data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "dynamodb_query_policy" {
  statement {
    effect = "Allow"

    actions = [
      "dynamodb:Query",
    ]

    resources = [
      aws_dynamodb_table.available_train_dynamodb_table.arn
    ]

  }
}