import { Request } from 'express';
import IPayload from './IPayload';

export default interface IRequest extends Request {
  user: IPayload;
}
