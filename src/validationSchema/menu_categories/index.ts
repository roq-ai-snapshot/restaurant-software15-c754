import * as yup from 'yup';
import { menu_itemsValidationSchema } from 'validationSchema/menu_items';

export const menu_categoriesValidationSchema = yup.object().shape({
  name: yup.string().required(),
  restaurant_id: yup.string().nullable(),
  menu_items: yup.array().of(menu_itemsValidationSchema),
});
