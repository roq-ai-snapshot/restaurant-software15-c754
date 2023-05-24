import * as yup from 'yup';

export const reservationsValidationSchema = yup.object().shape({
  reservation_time: yup.date().required(),
  number_of_guests: yup.number().integer().required(),
  table_assignment: yup.number().integer(),
  customer_id: yup.string().nullable(),
  restaurant_id: yup.string().nullable(),
});
