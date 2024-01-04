# Market Status API

## Introduction (Solution Explaining)

This section provides an overview of the construction of this file and the initial guide.

Firstly, the directory structure adheres to the principles of "Clean Architecture." The 'core' folder encompasses shared elements across all layers, such as configurations, exceptions, interfaces, abstract classes, and base classes. The 'infra' folder contains external access gateways, such as the database module and health checks. The 'resources' layer contains the bounded-context domains, aligning with Domain-Driven Design (DDD) theory. Each domain within 'resources' includes controllers, entities, services, and dtos, and in some circunstances, jobs, templates, an so on. For instance, the "email service" should be placed in the 'infra' layer, while the emails themselves might be located at the 'resources' level. The 'use-cases' folder within the 'market-status' context follows the clean-architecture concept, placing business logic in a "use-case" entity, which may consume other services (repositories). Resembling a "CQRS" approach, a "command handler" could serve as a use-case entity.

The next section outlines the process for running the application locally. The steps involve installing nvm, docker, and executing specific scripts.

Regarding to readability and quality, staged files are being checked by husky, a pre-commit tool. If lint issues arise during commit, Husky utilizes lint-staged to rectify them, as configured in the package.json. Husky also verifies commit messages to adhere to the commitlint style. In this case, I have decided to use just one branch instead of feature-branch approach, due to the usage of husky+commitlint combination.

NestJS offers configuration management services, but the addition of "dotenv-flow" is preferred for managing environment files and variables in a more streamlined manner (in a cool way).

The subsequent part details the deployment process, acknowledging its intricacies due to AWS networking complexities (VPC, subnets, security groups, routing tables, and gateways). While CI/CD could enhance automation, the current script serves as a solid initial deployment using Terraform for infrastructure provisioning. Refer to the [architecture diagram](./iac/architecture.drawio) for a visual representation (open it with draw.io). Concerning with architecture desing, the API is being deployed within an EC2 machine, using PM2 as a process monitor, accessing a Postgres DB deployed at RDS.

The core business logic involves:

- Retrieving information from Bitfinex's Orderbook and Ticker endpoints.
- Saving the Ticker response, including the last price, volume, and pair.
- Retrieving information from the database using the second endpoint.

## Folder Structure

```
src
  core -> core things, some folders could be moved to infra like middlewares, filters, decorators or config
    config
    decorators
    entities
    enums
    exception-filters
    exceptions
    interfaces
    middlewares
    services

  infra -> infrastructure things, such database connectors/managers, external services for differents resources
    database
      migrations

  resources -> could be called 'modules', here are the representative domains of the applications
    market-status
      controllers -> api endpoints
      services
        bitfinex -> external services
        use-cases -> business logic
      dtos -> input/output dtos
      entities -> db entities

```

## Locally

### Running

```
# Select which Nodejs version you will use.
nvm use 20
npm i

# Start docker environment
docker compose up -d # just first time!

# Run migrations
NODE_ENV=development npm run typeorm:run-migrations # just first time!

# Start the API
npm run start:dev # or F5 within vscode

```

Then, navigate to http://localhost:3002/docs to see swagger in action.
First endpoint, which retrieves and save information from Bitfinex is `POST /market-status/status`. The second endpoint which consumes information from its own database is `GET /market-status/historic-price/{buyer}/{seller}`

### Migrations

How to run migrations? Follow the next commands

```
# Create migration
NODE_ENV=development npm run typeorm:generate-migration --name=<migration-name>

# Run migrations
NODE_ENV=development npm run typeorm:run-migrations
```

### Development

Commits are being format by husky(precommit) and commitlint(style):

- commits format: https://github.com/conventional-changelog/commitlint
  - build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
    Why using commitlint? Could be interesting to combine with [standard-version](https://github.com/conventional-changelog/standard-version/tree/master) lib for semantic versioning and changelog generation.
  - BTW, it will fails if you doesn't apply the styles rules.

### Environment Administration

Using dotenv-flow to load environment variables.
Why? Because 'df' allows you to mantain several environment variables files such development, test, staging, prod. BTW, using dotenv lib to follow the [12-factor](https://12factor.net/) methodology. Environment files should not be placed or versioned within the repository, but for this case (challenge) it is permitted.

## Deployment

The intent is to deploy infrastructure and code in the same flow.

Below, there are some commands and scripts to deploy your own version in aws. REQUIRED: terraform.

### Requirements

- EC2 instances should be accessible anywhere on internet (via http)
- EC2 should be accessed by SSH
- RDS should be in a private subnet (EC2 could be a jumphost)
- EC2 should be able to comunicate with RDS
- Required: terraform, @nest/cli, pm2, node, nvm, docker, bash

<!-- Refs:
  - https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options-general.html
  - https://medium.com/@hmalgewatta/setting-up-an-aws-ec2-instance-with-ssh-access-using-terraform-c336c812322f
  - https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
  - errors on user_data look at: /var/log/cloud-init-output.log
  - https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.PostgreSQL.html
    - check if db is running inside ec2: psql --host=endpoint --port=5432 --dbname=postgres --username=postgres
-->

```bash
# create the file `iac/secrets.tfvars` with the following information:
aws_profile = "<your aws profile user at ~/.aws/credentials>"
aws_region = "us-east-1"

# run the following script to startup infrastructure and deploy
bash deploy.sh # script needs user's answers

# Navigate to
cd iac
export AWS_INSTANCE_DNS=$(terraform output -raw aws_instance_dns)
echo "http://$AWS_INSTANCE_DNS:8080/docs"

# after test it out, destroy environments
terraform destroy -var-file=secrets.tfvars -auto-approve
cd -
```

Issues with ssh?
- add at ~/.ssh/config the following config
```
Host *
  IdentitiesOnly yes
```

## Future/Improvements

- add CI/CD, also enhance deployment features
- Create a set of unit tests for the logic used in the Market Depth implementation
- Scalable solution:
  - add websockets
  - multiple ec2 instances (horizontal scaling)
  - multiple nodejs services (pm2 concurrency - vertical scaling)
  - using ecs or eks (containers approach)
- Logging:
  - move logging within prod to cloudwatch
  - healthcheck is created, but is not being used.
- use modules for terraform
- add pagination capabilities (nest-paginate)
- fix the repl cli (could be useful)
- add authentication+authorization

## References:

- [12-factor](https://12factor.net/)
- [Commitlint](https://github.com/conventional-changelog/commitlint)
- [standard-version](https://github.com/conventional-changelog/standard-version/tree/master)
- [Nest - Request Lifecycle](https://docs.nestjs.com/faq/request-lifecycle)
- [Bitfinex API - Interested endpoints](https://docs.bitfinex.com/reference)
  - Orderbook
    - https://api.bitfinex.com/v1/book/ETHUSD
    - https://api.bitfinex.com/v2/book/tETHUSD/P0
  - Ticker
    - https://api.bitfinex.com/v1/pubticker/ethusd
    - https://api-pub.bitfinex.com/v2/ticker/tETHUSD
  - Config:
    - https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange
