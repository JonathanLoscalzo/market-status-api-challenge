terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "4.0.5"
    }
  }

}

provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}

provider "tls" {

}

# networks

resource "aws_vpc" "ratherlabs-vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "ratherlabs-vpc"
  }
}

resource "aws_subnet" "ec2_subnet" {
  vpc_id                  = aws_vpc.ratherlabs-vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "${var.aws_region}a"
}

resource "aws_subnet" "rds_subnet" {
  vpc_id            = aws_vpc.ratherlabs-vpc.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "${var.aws_region}a"
}

resource "aws_subnet" "rds_subnet2" {
  vpc_id            = aws_vpc.ratherlabs-vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.aws_region}b"
}

resource "aws_db_subnet_group" "ratherlabs-db-subnet-groups" {
  name       = "ratherlabs-db-subnet-groups"
  subnet_ids = [aws_subnet.rds_subnet.id, aws_subnet.rds_subnet2.id]

  tags = {
    Name = "My DB subnet group"
  }
}

resource "aws_internet_gateway" "ratherlabs_internet_gateway" {
  vpc_id = aws_vpc.ratherlabs-vpc.id

  tags = {
    Name = "ratherlabs_internet_gateway"
  }
}

resource "aws_route_table" "route-table-ratherlabs" {
  vpc_id = aws_vpc.ratherlabs-vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ratherlabs_internet_gateway.id
  }
  tags = {
    Name = "route-table-ratherlabs"
  }
}

resource "aws_route_table_association" "ratherlabs-subnet-association" {
  subnet_id      = aws_subnet.ec2_subnet.id
  route_table_id = aws_route_table.route-table-ratherlabs.id
}

# security groups

resource "aws_security_group" "ratherlabs_ec2_sg" {
  vpc_id = aws_vpc.ratherlabs-vpc.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  #   ingress {
  #     from_port   = 80
  #     to_port     = 80
  #     protocol    = "tcp"
  #     cidr_blocks = ["0.0.0.0/0"]
  #   }

  #   ingress {
  #     from_port   = 443
  #     to_port     = 443
  #     protocol    = "tcp"
  #     cidr_blocks = ["0.0.0.0/0"]
  #   }

  tags = {
    Name = "Ratherlabs EC2 Security Group"
  }
}

resource "aws_security_group" "ratherlabs_rds_sg" {
  vpc_id = aws_vpc.ratherlabs-vpc.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ratherlabs_ec2_sg.id]
  }

  tags = {
    Name = "Ratherlabs RDS Security Group"
  }
}

# ec2

resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096

}

resource "aws_key_pair" "deployer" {
  key_name   = "access-key"
  public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "local_file" "ssh_private_key" {
  content  = tls_private_key.ssh_key.private_key_openssh
  filename = "private_key.pem"
}

resource "aws_instance" "api_server" {
  ami                         = "ami-0c7217cdde317cfec" # Actualiza con una AMI válida
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.ec2_subnet.id
  vpc_security_group_ids      = [aws_security_group.ratherlabs_ec2_sg.id]
  key_name                    = aws_key_pair.deployer.key_name
  tags = {
    Name = "API Server"
  }
  instance_initiated_shutdown_behavior = "terminate"
  user_data_replace_on_change          = true
}

# rds

resource "aws_db_instance" "market-status-db" {
  db_name                = "marketStatus"
  identifier             = "market-status"
  instance_class         = "db.t3.micro"
  allocated_storage      = 5
  engine                 = "postgres"
  engine_version         = "15.4"
  username               = var.db_username
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.ratherlabs-db-subnet-groups.name
  vpc_security_group_ids = [aws_security_group.ratherlabs_rds_sg.id]
  publicly_accessible = false
  skip_final_snapshot = true
}



