import * as yup from 'yup';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { order_itemsValidationSchema } from 'validationSchema/order_items';

export const ordersValidationSchema = yup.object().shape({
  order_type: yup.string().required(),
  special_requests: yup.string(),
  discount: yup.number().integer(),
  payment_status: yup.string().required(),
  created_at: yup.date().required(),
  customer_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
  waiter_id: yup.string().nullable(),
  feedback: yup.array().of(feedbackValidationSchema),
  order_items: yup.array().of(order_itemsValidationSchema),
});
