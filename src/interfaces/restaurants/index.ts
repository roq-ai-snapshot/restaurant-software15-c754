import { FeedbackInterface } from 'interfaces/feedbacks';
import { Menu_categoriesInterface } from 'interfaces/menu_categories';
import { OrdersInterface } from 'interfaces/orders';
import { ReservationsInterface } from 'interfaces/reservations';
import { StaffInterface } from 'interfaces/staff';

export interface RestaurantsInterface {
  id?: string;
  owner_id?: string;
  name: string;
  location: string;
  contact_information: string;
  operating_hours: string;
  feedback?: FeedbackInterface[];
  menu_categories?: Menu_categoriesInterface[];
  orders?: OrdersInterface[];
  reservations?: ReservationsInterface[];
  staff?: StaffInterface[];
}
