import { Router } from 'express';
import { identifyContactController } from '../controller/contact.controller';
import { asyncHandler } from "../utils/errorHandler";
import prisma from "../lib/prisma";
import { sendResponse } from '../utils/sendResponse';

const router = Router();

router.get('/', (req, res) => {
  res.send('contact service is running.');
});

router.get(
  "/contacts",
  asyncHandler(async (_req, res) => {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "asc" },
    });
    sendResponse(res, {status:200, success:true, data:contacts, message:"contacts retrieved successfully"});
  })
);

router.post(
  '/identify',
  asyncHandler(identifyContactController) 
);


export default router;
