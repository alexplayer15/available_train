provider "aws" {
  region = "eu-west-2"
  assume_role {
    role_arn = var.workspace_iam_role
  }
}
