import { Request } from 'express';
import { User } from '../models';
interface IUser {
  name?: string;
  email?: string;
  password?: string;
}

interface ITodo {
  title?: string;
  description?: string;
  userId?: number;
}

interface IUserCreate {
  statusCode?: number;
  message: string;
  data?: User;
}

interface IloginUserResponse {
  statusCode?: number;
  message: string;
  data?: {
    token: string;
  };
}

interface Ipayload {
  id: number;
}

interface IModifyRequest extends Request {
  user: number;
}
export {
  IUser,
  IUserCreate,
  IloginUserResponse,
  Ipayload,
  ITodo,
  IModifyRequest,
};
