import { Order_itemsInterface } from 'interfaces/order_items';

export interface Menu_itemsInterface {
  id?: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  order_items?: Order_itemsInterface[];
}
