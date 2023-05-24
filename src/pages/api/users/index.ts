import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { usersValidationSchema } from 'validationSchema/users';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers();
    case 'POST':
      return createUsers();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getUsers() {
    const data = await prisma.users.findMany({});
    return res.status(200).json(data);
  }

  async function createUsers() {
    await usersValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.feedback?.length > 0) {
      const create_feedback = body.feedback;
      body.feedback = {
        create: create_feedback,
      };
    } else {
      delete body.feedback;
    }
    if (body?.orders_orders_customer_idTousers?.length > 0) {
      const create_orders_orders_customer_idTousers = body.orders_orders_customer_idTousers;
      body.orders_orders_customer_idTousers = {
        create: create_orders_orders_customer_idTousers,
      };
    } else {
      delete body.orders_orders_customer_idTousers;
    }
    if (body?.orders_orders_waiter_idTousers?.length > 0) {
      const create_orders_orders_waiter_idTousers = body.orders_orders_waiter_idTousers;
      body.orders_orders_waiter_idTousers = {
        create: create_orders_orders_waiter_idTousers,
      };
    } else {
      delete body.orders_orders_waiter_idTousers;
    }
    if (body?.reservations?.length > 0) {
      const create_reservations = body.reservations;
      body.reservations = {
        create: create_reservations,
      };
    } else {
      delete body.reservations;
    }
    if (body?.restaurants?.length > 0) {
      const create_restaurants = body.restaurants;
      body.restaurants = {
        create: create_restaurants,
      };
    } else {
      delete body.restaurants;
    }
    if (body?.staff?.length > 0) {
      const create_staff = body.staff;
      body.staff = {
        create: create_staff,
      };
    } else {
      delete body.staff;
    }
    const data = await prisma.users.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
