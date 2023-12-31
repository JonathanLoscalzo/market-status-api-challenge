export class Ticker {
  // BID	float	Price of last highest bid
  bid: any;

  // BID_SIZE	float	Sum of the 25 highest bid sizes
  bidSize: any;
  // ASK	float	Price of last lowest ask
  ask: any;

  // ASK_SIZE	float	Sum of the 25 lowest ask sizes
  askSize: any;

  // DAILY_CHANGE	float	Amount that the last price has changed since yesterday
  dailyChange: any;

  // DAILY_CHANGE_RELATIVE	float	Relative price change since yesterday (*100 for percentage change)
  dailyChangeRelative: any;

  // LAST_PRICE	float	Price of the last trade
  lastPrice: any;

  // VOLUME	float	Daily volume
  volume: any;

  // HIGH	float	Daily high
  high: any;

  // LOW	float	Daily low
  low: any;

  constructor({
    bid,
    bidSize,
    ask,
    askSize,
    dailyChange,
    dailyChangeRelative,
    lastPrice,
    volume,
    high,
    low,
  }) {
    this.bid = bid;
    this.bidSize = bidSize;
    this.ask = ask;
    this.askSize = askSize;
    this.dailyChange = dailyChange;
    this.dailyChangeRelative = dailyChangeRelative;
    this.lastPrice = lastPrice;
    this.volume = volume;
    this.high = high;
    this.low = low;
  }
}
