import type { AxiosResponse } from "axios";

import api from "./api";

interface OrderApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string; // JSON stringified array
}

/**
 * Função para listar pedidos de um usuário (paginado).
 * @param userId - O ID do usuário.
 * @param paginas - Número da página.
 * @param linhas - Número de linhas por página.
 */
export const getOrdersByUser = (
  userId: string,
  paginas: number,
  linhas: number
): Promise<AxiosResponse<OrderApiResponse>> => {
  return api.get("/orders/orders/user", {
    params: {
      userId,
      paginas,
      linhas
    }
  });
};

/**
 * Função para finalizar um pedido.
 * @param orderShopId - O ID do pedido.
 */
export const finishOrder = (
  orderShopId: string
): Promise<AxiosResponse<OrderApiResponse>> => {
  return api.put(`/orders/${orderShopId}/finish`);
};

interface ReportApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string;
}

/**
 * Função para obter relatório de pedidos de um usuário.
 * @param userId - O ID do usuário.
 */
export const getOrdersReport = (
  userId: string
): Promise<AxiosResponse<ReportApiResponse>> => {
  return api.get(`/orders/${userId}/report`);
};

interface OrderSummaryApiResponse {
  statusCode: number;
  message: string;
  path: string;
  data: string; // JSON stringified: {OrdersTotal, OrdersWaitingTotal, CashBonusTotal}
}

/**
 * Função para obter o resumo de um pedido.
 * @param orderId - O ID do pedido.
 */
export const getOrderSummary = (
  orderId: string
): Promise<AxiosResponse<OrderSummaryApiResponse>> => {
  return api.get(`/orders/${orderId}/summary`);
};
