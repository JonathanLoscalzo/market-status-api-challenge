export interface OrderBookItem {
  // [0]	PRICE	float	Price level
  price: number;

  // [1]	COUNT	int	Number of orders at that price level
  count: number;

  // [2]	AMOUNT	float	Total amount available at that price level (if AMOUNT > 0 then bid else ask
  amount: number;

  type: 'bid' | 'ask';
}
