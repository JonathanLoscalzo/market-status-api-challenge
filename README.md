# Market Status API

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

## Running Locally

```
# Select which Nodejs version you will use.
nvm use 20
npm i

# Start docker environment
docker compose up -d # first time!

# Run migrations
NODE_ENV=development npm run typeorm:run-migrations # first time!

# Start the API
npm run start:dev
```

## Migrations

How to run migrations? Follow the next commands

```
# Create migration
NODE_ENV=development npm run typeorm:generate-migration --name=<migration-name>

# Run migrations
NODE_ENV=development npm run typeorm:run-migrations
```

## Development

Commits are being format by husky(precommit) and commitlint(style):
- commits format: https://github.com/conventional-changelog/commitlint
  - build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
Why using commitlint? Could be interesting to combine with [standard-version](https://github.com/conventional-changelog/standard-version/tree/master) lib for semantic versioning and changelog generation.

### Environment

Using dotenv-flow to load environment variables. 
Why? Because 'df' allows you to mantain several environment variables files such development, test, staging, prod. BTW, using dotenv lib to follow the [12-factor](https://12factor.net/) methodology. Environment files should not be placed or versioned within the repository, but for this case (challenge) it is permitted.

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
