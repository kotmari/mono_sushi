import { IProductResponse } from '../product/product.interface';


export interface IOrderRequest{
  orderProduct: Array<IProductResponse>,
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  countDevices: number,
  devices: string,
  cash: string,
  delivery: string,
  data:string,
  status:string,
  call: string
  }

  export interface IOrderResponse extends IOrderRequest{
    id: string
  }
