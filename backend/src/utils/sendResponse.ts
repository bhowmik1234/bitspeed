import { Response } from "express";

interface ResponsePayload<T> {
  status?: number;
  success?: boolean;
  data?: T;
  message?: string;
}

export const sendResponse = <T>(
  res: Response,
  { status = 200, success = true, data, message }: ResponsePayload<T>
) => {
  return res.status(status).json({
    success,
    message,
    data,
  });
};
