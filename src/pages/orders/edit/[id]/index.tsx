import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getOrdersById, updateOrdersById } from 'apiSdk/orders';
import { Error } from 'components/error';
import { ordersValidationSchema } from 'validationSchema/orders';
import { OrdersInterface } from 'interfaces/orders';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users_orders_customer_idTousers';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { UsersInterface } from 'interfaces/users_orders_waiter_idTousers';
import { getUsers_orders_customer_idtousers } from 'apiSdk/users_orders_customer_idTousers';
import { getRestaurants } from 'apiSdk/restaurants';
import { getUsers_orders_waiter_idtousers } from 'apiSdk/users_orders_waiter_idTousers';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';
import { order_itemsValidationSchema } from 'validationSchema/order_items';

function OrdersEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<OrdersInterface>(id, getOrdersById);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateOrdersById(id, values);
      mutate(updated);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: data,
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="order_type" mb="4" isInvalid={!!formik.errors.order_type}>
              <FormLabel>Order Type</FormLabel>
              <Input type="text" name="order_type" value={formik.values.order_type} onChange={formik.handleChange} />
              {formik.errors.order_type && <FormErrorMessage>{formik.errors.order_type}</FormErrorMessage>}
            </FormControl>
            <FormControl id="special_requests" mb="4" isInvalid={!!formik.errors.special_requests}>
              <FormLabel>Special Requests</FormLabel>
              <Input
                type="text"
                name="special_requests"
                value={formik.values.special_requests}
                onChange={formik.handleChange}
              />
              {formik.errors.special_requests && <FormErrorMessage>{formik.errors.special_requests}</FormErrorMessage>}
            </FormControl>
            <FormControl id="discount" mb="4" isInvalid={!!formik.errors.discount}>
              <FormLabel>Discount</FormLabel>
              <NumberInput
                name="discount"
                value={formik.values.discount}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('discount', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.discount && <FormErrorMessage>{formik.errors.discount}</FormErrorMessage>}
            </FormControl>
            <FormControl id="payment_status" mb="4" isInvalid={!!formik.errors.payment_status}>
              <FormLabel>Payment Status</FormLabel>
              <Input
                type="text"
                name="payment_status"
                value={formik.values.payment_status}
                onChange={formik.handleChange}
              />
              {formik.errors.payment_status && <FormErrorMessage>{formik.errors.payment_status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'customer_id'}
              label={'Customer'}
              placeholder={'Select Users'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<RestaurantsInterface>
              formik={formik}
              name={'restaurant_id'}
              label={'Restaurant'}
              placeholder={'Select Restaurants'}
              fetcher={getRestaurants}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <AsyncSelect<UsersInterface>
              formik={formik}
              name={'waiter_id'}
              label={'Waiter'}
              placeholder={'Select Users'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record.id}
                </option>
              )}
            />
            <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default OrdersEditPage;
