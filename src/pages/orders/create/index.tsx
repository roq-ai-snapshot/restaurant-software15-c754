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
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createOrders } from 'apiSdk/orders';
import { Error } from 'components/error';
import { OrdersInterface } from 'interfaces/orders';
import { ordersValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { Users_orders_customer_idtousersInterface } from 'interfaces/users_orders_customer_idTousers';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { Users_orders_waiter_idtousersInterface } from 'interfaces/users_orders_waiter_idTousers';
import { getUsers } from 'apiSdk/users';
import { getRestaurants } from 'apiSdk/restaurants';
import { UsersInterface } from 'interfaces/users';
import { getMenu_items } from 'apiSdk/menu_items';
import { Menu_itemsInterface } from 'interfaces/menu_items';
import { getUsers_orders_customer_idtousers } from 'apiSdk/users_orders_customer_idTousers';
import { getUsers_orders_waiter_idtousers } from 'apiSdk/users_orders_waiter_idTousers';

function OrdersCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrdersInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrders(values);
      resetForm();
      router.push('/orders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrdersInterface>({
    initialValues: {
      order_type: '',
      special_requests: '',
      discount: 0,
      payment_status: '',
      customer_id: null,
      restaurant_id: null,
      waiter_id: null,
      feedback: [],
      order_items: [],
    },
    validationSchema: ordersValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Orders
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
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

          <ArrayFormField
            values={formik.values.feedback}
            errors={formik.errors.feedback}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'rating', label: 'rating' },
              { fieldName: 'comment', label: 'comment' },
              { fieldName: 'customer_id', label: 'users' },
              { fieldName: 'restaurant_id', label: 'restaurants' },
            ]}
            title={'Feedback'}
            name="feedback"
            rowInitialValues={{ rating: 0, comment: '', customer_id: null, restaurant_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'rating' && (
                  <FormControl id="rating" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'comment' && (
                  <FormControl id="comment" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
                {fieldName === 'restaurant_id' && (
                  <AsyncSelect<RestaurantsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Restaurants'}
                    fetcher={getRestaurants}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.order_items}
            errors={formik.errors.order_items}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'quantity', label: 'quantity' },
              { fieldName: 'menu_item_id', label: 'menu_items' },
            ]}
            title={'Order Items'}
            name="order_items"
            rowInitialValues={{ quantity: 0, menu_item_id: null }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'quantity' && (
                  <FormControl id="quantity" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'menu_item_id' && (
                  <AsyncSelect<Menu_itemsInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Menu_items'}
                    fetcher={getMenu_items}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default OrdersCreatePage;
