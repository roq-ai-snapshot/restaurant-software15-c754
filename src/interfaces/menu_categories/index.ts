import { Menu_itemsInterface } from 'interfaces/menu_items';

export interface Menu_categoriesInterface {
  id?: string;
  restaurant_id?: string;
  name: string;
  menu_items?: Menu_itemsInterface[];
}
