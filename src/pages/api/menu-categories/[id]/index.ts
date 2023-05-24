import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { menu_categoriesValidationSchema } from 'validationSchema/menu_categories';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getMenu_categories();
    case 'PUT':
      return updateMenu_categories();
    case 'DELETE':
      return deleteMenu_categories();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMenu_categories() {
    const data = await prisma.menu_categories.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateMenu_categories() {
    await menu_categoriesValidationSchema.validate(req.body);
    const data = await prisma.menu_categories.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteMenu_categories() {
    const data = await prisma.menu_categories.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
