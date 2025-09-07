resource "aws_dynamodb_table" "available_train_dynamodb_table" {
  name         = local.available_train_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "routeId"
  range_key    = "departureDate"
  attribute {
    name = "routeId"
    type = "S"
  }
  attribute {
    name = "departureDate"
    type = "S"
  }
  tags = {
    Name        = local.available_train_name
    Environment = var.environment
  }
}