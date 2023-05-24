import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { feedbackValidationSchema } from 'validationSchema/feedbacks';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getFeedback();
    case 'PUT':
      return updateFeedback();
    case 'DELETE':
      return deleteFeedback();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFeedback() {
    const data = await prisma.feedback.findFirst({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }

  async function updateFeedback() {
    await feedbackValidationSchema.validate(req.body);
    const data = await prisma.feedback.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteFeedback() {
    const data = await prisma.feedback.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
