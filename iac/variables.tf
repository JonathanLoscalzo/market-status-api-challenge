variable "aws_region" {
  default = "us-east-1"
}

variable "aws_profile" {
  nullable = false
}

variable "db_username" {
  default = "prod"
}

variable "db_password" {
  default = "prod!1234"
}
