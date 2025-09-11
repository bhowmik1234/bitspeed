import { Request, Response } from "express";
import prisma from "../lib/prisma";
import { sendResponse } from "../utils/sendResponse";

export const identifyContactController = async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return sendResponse(res, {
      status: 400,
      success: false,
      message: "Either email or phoneNumber must be provided.",
    });
  }

  const matches = await prisma.contact.findMany({
    where: { OR: [{ email }, { phoneNumber }] },
    orderBy: { createdAt: "asc" },
  });

  if (!matches.length) {
    const created = await prisma.contact.create({
      data: { email: email || null, phoneNumber: phoneNumber || null, linkPrecedence: "primary" },
    });

    return sendResponse(res, {
      data: {
        contact: {
          primaryContatctId: created.id,
          emails: created.email ? [created.email] : [],
          phoneNumbers: created.phoneNumber ? [created.phoneNumber] : [],
          secondaryContactIds: [],
        },
      },
    });
  }

  let primary = matches.find(c => c.linkPrecedence === "primary") || matches[0];
  if (primary.linkedId) {
    primary = (await prisma.contact.findUnique({ where: { id: primary.linkedId } })) || primary;
  }

  const linked = await prisma.contact.findMany({
    where: { OR: [{ id: primary.id }, { linkedId: primary.id }] },
  });

  const allContacts = [...matches, ...linked];
  const emails = new Set(allContacts.map(c => c.email).filter(Boolean));
  const phones = new Set(allContacts.map(c => c.phoneNumber).filter(Boolean));
  const secondaryIds = allContacts.filter(c => c.id !== primary.id).map(c => c.id);

  await Promise.all(
    allContacts
      .filter(c => c.id !== primary.id && c.linkPrecedence === "primary")
      .map(c =>
        prisma.contact.update({
          where: { id: c.id },
          data: { linkedId: primary.id, linkPrecedence: "secondary" },
        })
      )
  );

  if ((email && !emails.has(email)) || (phoneNumber && !phones.has(phoneNumber))) {
    const sec = await prisma.contact.create({
      data: { email: email || null, phoneNumber: phoneNumber || null, linkedId: primary.id, linkPrecedence: "secondary" },
    });
    secondaryIds.push(sec.id);
    if (sec.email) emails.add(sec.email);
    if (sec.phoneNumber) phones.add(sec.phoneNumber);
  }

  return sendResponse(res, {
    data: {
      contact: {
        primaryContatctId: primary.id,
        emails: [...emails],
        phoneNumbers: [...phones],
        secondaryContactIds: [...new Set(secondaryIds)],
      },
    },
  });
};
