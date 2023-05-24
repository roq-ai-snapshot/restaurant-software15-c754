import { FeedbackInterface } from 'interfaces/feedbacks';
import { Order_itemsInterface } from 'interfaces/order_items';

export interface OrdersInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  waiter_id?: string;
  order_type: string;
  special_requests?: string;
  discount?: number;
  payment_status: string;
  created_at: Date;
  feedback?: FeedbackInterface[];
  order_items?: Order_itemsInterface[];
}
