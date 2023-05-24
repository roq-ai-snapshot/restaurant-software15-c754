import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menu_categoriesValidationSchema } from 'validationSchema/menu_categories';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenu_categories();
    case 'POST':
      return createMenu_categories();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenu_categories() {
    const data = await prisma.menu_categories.findMany({});
    return res.status(200).json(data);
  }

  async function createMenu_categories() {
    await menu_categoriesValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.menu_items?.length > 0) {
      const create_menu_items = body.menu_items;
      body.menu_items = {
        create: create_menu_items,
      };
    } else {
      delete body.menu_items;
    }
    const data = await prisma.menu_categories.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
