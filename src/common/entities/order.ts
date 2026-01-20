import { ProductEntity } from "./product";

export interface OrderItem {
  orderItemId: string;
  orderShopId: string;
  productId: string;
  isBonus: boolean;
  amount: number;
  price: number;
  product?: ProductEntity;
}

export interface OrderResponse {
  orderShopId: string;
  shopId: string;
  shopName: string;
  internalNumber: string;
  createdAt: string;
  orderStatus: number;
  comments: string;
  items: OrderItem[];
  finishAt: string;
  totalAmount: number;
  tokenPayment: string;
  amountServiceFee: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  document: string;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CreditCardInfo {
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
}

export interface PixInfo {
  key: string;
  keyType: string;
}

export interface OrderCreateRequest {
  orderId: string;
  shopId: string;
  shopName: string;
  userId: string;
  createdAt: string;
  items: OrderItem[];
  comments: string;
  totalAmount: number;
  baristaId: string;
  amountServiceFee: number;
  paymentMethod: number;
  customer: CustomerInfo;
  billingAddress: Address;
  creditCard?: CreditCardInfo;
  pix?: PixInfo;
}
