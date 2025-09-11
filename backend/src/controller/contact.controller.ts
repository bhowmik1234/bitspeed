import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";

export const identifyContactController = async (req: Request, res: Response) => {
    return sendResponse(res, {
        status: 200,
        success: true,
        data: null,
        message: "contact created"
    })
}