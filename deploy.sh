#!/bin/bash
set -e

if ! command -v terraform &> /dev/null
then
    echo "Terraform could not be found"
    exit
fi

cd iac
terraform init
terraform apply -var-file=secrets.tfvars -auto-approve

export AWS_INSTANCE_DNS=$(terraform output -raw aws_instance_dns)
echo "DATABASE_HOST=$(terraform output -raw market-status-db-endpoint | cut -d ':'  -f 1 )" > ../environments/.env.production.local
echo "After finish, navigate to http://$AWS_INSTANCE_DNS:8080/docs"

sudo chmod 400 private_key.pem
cd -
npm run build # build is done locally, or then in a CI
rm -f backend.zip
zip -r backend.zip * -x "iac/*" "node_modules/*"
scp -i ./iac/private_key.pem -pr backend.zip ubuntu@$AWS_INSTANCE_DNS:/home/ubuntu/
ssh -i ./iac/private_key.pem ubuntu@$AWS_INSTANCE_DNS 'sudo apt-get install unzip -y; rm -f backend; unzip backend.zip -d backend; bash /home/ubuntu/backend/startup.sh'


#!/bin/bash
set -e

# Check if Terraform is installed
if ! command -v terraform &> /dev/null
then
    echo "Terraform could not be found"
    exit
fi

# Change directory to the 'iac' folder
cd iac

# Initialize Terraform
terraform init

# Apply Terraform configuration using variables from 'secrets.tfvars' and auto-approve changes
terraform apply -var-file=secrets.tfvars -auto-approve

# Export AWS_INSTANCE_DNS variable with the public DNS of the AWS instance
export AWS_INSTANCE_DNS=$(terraform output -raw aws_instance_dns)

# Create a .env.production.local file with the DATABASE_HOST value from Terraform output
echo "DATABASE_HOST=$(terraform output -raw market-status-db-endpoint | cut -d ':'  -f 1 )" > ../environments/.env.production.local

# Change permissions for the private key file
sudo chmod 400 private_key.pem

# Move back to the previous directory
cd -

# Build the project locally, in feature releases it could be done in a CI environment
npm run build

# Remove any existing 'backend.zip'
rm -f backend.zip

# Create a zip archive excluding 'iac' and 'node_modules' folders
zip -r backend.zip * -x "iac/*" "node_modules/*"

# Copy the 'backend.zip' file to the AWS instance using SCP
scp -i ./iac/private_key.pem -pr backend.zip ubuntu@$AWS_INSTANCE_DNS:/home/ubuntu/

# SSH into the AWS instance, install unzip, extract the archive, and execute the startup script
ssh -i ./iac/private_key.pem ubuntu@$AWS_INSTANCE_DNS 'sudo apt-get install unzip -y; rm -f backend; unzip backend.zip -d backend; bash /home/ubuntu/backend/startup.sh'

# Print a message with the URL to navigate to after the script finishes
echo "After finish, navigate to http://$AWS_INSTANCE_DNS:8080/docs"