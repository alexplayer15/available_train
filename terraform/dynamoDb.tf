resource "aws_dynamodb_table" "available_train_dynamodb_table" {
  name         = local.available_train_name
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "RouteId"
  range_key    = "DepartureTime"

  attribute {
    name = "RouteId"
    type = "S"
  }

  attribute {
    name = "DepartureTime"
    type = "S"
  }

  attribute {
    name = "departureCode"
    type = "S"
  }

  attribute {
    name = "arrivalCode"
    type = "S"
  }

  attribute {
    name = "localDepartureDate"
    type = "S"
  }

  attribute {
    name = "languageCode"
    type = "S"
  }

  tags = {
    Name        = local.available_train_table_name
    Environment = var.environment
  }
}