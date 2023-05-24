import { FeedbackInterface } from 'interfaces/feedbacks';
import { Orders_orders_customer_idtousersInterface } from 'interfaces/orders_orders_customer_idTousers';
import { Orders_orders_waiter_idtousersInterface } from 'interfaces/orders_orders_waiter_idTousers';
import { ReservationsInterface } from 'interfaces/reservations';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { StaffInterface } from 'interfaces/staff';

export interface UsersInterface {
  id?: string;
  role: string;
  name: string;
  email: string;
  password: string;
  feedback?: FeedbackInterface[];
  orders_orders_customer_idTousers?: Orders_orders_customer_idtousersInterface[];
  orders_orders_waiter_idTousers?: Orders_orders_waiter_idtousersInterface[];
  reservations?: ReservationsInterface[];
  restaurants?: RestaurantsInterface[];
  staff?: StaffInterface[];
}
