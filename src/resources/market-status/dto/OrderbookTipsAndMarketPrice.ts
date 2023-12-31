import { OrderBookItem } from 'src/core/entities/order.entity';

export interface OrderbookTipsAndMarketPrice {
  bid: number;
  ask: number;
  marketPrice: number;
  orderbook: Partial<OrderBookItem>[];
}
