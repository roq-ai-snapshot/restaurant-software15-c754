export interface FeedbackInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  order_id?: string;
  rating: number;
  comment?: string;
}
