export interface ReservationsInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  reservation_time: Date;
  number_of_guests: number;
  table_assignment?: number;
}
