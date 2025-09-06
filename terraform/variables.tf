variable "environment" {
  type        = string
  description = "environment the provisioned infrastructure is in"
}

variable "artifact_name" {
  type        = string
  description = "the lambda artifact zip"

  validation {
    condition     = endsWith(var.artifact_name, ".zip")
    error_message = "Artifacts must be a .zip file"
  }

  default = "available-train-handler.zip"
}