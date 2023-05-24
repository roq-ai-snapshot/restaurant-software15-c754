import * as yup from 'yup';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { menu_categoriesValidationSchema } from 'validationSchema/menu_categories';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { staffValidationSchema } from 'validationSchema/staff';

export const restaurantsValidationSchema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  contact_information: yup.string().required(),
  operating_hours: yup.string().required(),
  owner_id: yup.string().nullable(),
  feedback: yup.array().of(feedbackValidationSchema),
  menu_categories: yup.array().of(menu_categoriesValidationSchema),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
