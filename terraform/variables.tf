variable "environment" {
  type        = string
  description = "environment the provisioned infrastructure is in"
}
variable "artifact_name" {
  type        = string
  description = "the lambda artifact zip"

  validation {
    condition     = endswith(var.artifact_name, ".zip")
    error_message = "Artifacts must be a .zip file"
  }

  default = "handler.zip"
}
variable "workspace_iam_role" {
  type        = string
  description = "AWS IAM Roles for the environment."
  default     = ""
}

variable "retention_in_days" {
  type = number
  description = "retention of CloudWatch logs in days"
}