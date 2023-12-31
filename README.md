# Market Status API

## Folder Structure

```
src
  core
    config
    decorators
    entities
    enums
    exception-filters
    exceptions
    services
  resources
    market-status
      controllers
      services
        bitfinex
        use-cases
      dtos

```

## Running Locally

```
<docker? migrations?>
npm run start:dev
```

## Development

Commits: 
- using husky and commitlint
- commits format: https://github.com/conventional-changelog/commitlint
  - build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test

### Environment


## References: 

### Bitfinex API

- Orderbook 
  - https://api.bitfinex.com/v1/book/ETHUSD
  - https://api.bitfinex.com/v2/book/tETHUSD/P0

- Ticker
  - https://api.bitfinex.com/v1/pubticker/ethusd
  - https://api-pub.bitfinex.com/v2/ticker/tETHUSD

- Config:
  - https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange