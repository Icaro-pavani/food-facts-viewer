import { Request, Response } from "express";
import connectionService from "../services/connectionService.js";

export async function getApiInfo(req: Request, res: Response) {
  const apiInfo = await connectionService.gatherApiInfo();
  res.status(200).send(apiInfo);
}
