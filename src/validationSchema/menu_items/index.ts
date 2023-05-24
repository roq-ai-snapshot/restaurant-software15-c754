import * as yup from 'yup';
import { order_itemsValidationSchema } from 'validationSchema/order_items';

export const menu_itemsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  price: yup.number().integer().required(),
  category_id: yup.string().nullable(),
  order_items: yup.array().of(order_itemsValidationSchema),
});
