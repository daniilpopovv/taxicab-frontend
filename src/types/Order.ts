import {Address} from "./Address";

enum OrderStatusType {
  NEW = 'Новый',
  CANCELLED = 'Отменен'
}

type Order = {
  uuid: string;
  phone_number: string;
  from_address: Address;
  to_address: Address;
  status: OrderStatusType;
  created_at: string;
  updated_at: string;
}

export {
  type Order,
  OrderStatusType
}