// cookieUtils.ts

import { Response } from "express";

export const setCookie = (
  res: Response,
  name: string,
  value: string,
  options: any
) => {
  res.cookie(name, value, options);
};

export const getCookie = (req: any, name: string) => {
  return req.cookies[name];
};

export const clearCookie = (res: Response, name: string) => {
  res.clearCookie(name);
};
