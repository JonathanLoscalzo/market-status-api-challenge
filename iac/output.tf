
output "aws_instance_ip" {
  value = aws_instance.api_server.public_ip
}

output "aws_instance_dns" {
  value = aws_instance.api_server.public_dns
}

output "public_key_openssh" {
  value = tls_private_key.ssh_key.public_key_openssh
}

output "private_key_openssh" {
  value     = tls_private_key.ssh_key.private_key_openssh
  sensitive = true
}

output "market-status-db-endpoint" {
  value = aws_db_instance.market-status-db.endpoint
}