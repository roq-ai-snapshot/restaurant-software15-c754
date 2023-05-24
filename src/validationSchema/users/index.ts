import * as yup from 'yup';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { orders_orders_customer_idTousersValidationSchema } from 'validationSchema/orders_orders_customer_idTousers';
import { orders_orders_waiter_idTousersValidationSchema } from 'validationSchema/orders_orders_waiter_idTousers';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { staffValidationSchema } from 'validationSchema/staff';

export const usersValidationSchema = yup.object().shape({
  role: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  feedback: yup.array().of(feedbackValidationSchema),
  orders_orders_customer_idTousers: yup.array().of(orders_orders_customer_idTousersValidationSchema),
  orders_orders_waiter_idTousers: yup.array().of(orders_orders_waiter_idTousersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
