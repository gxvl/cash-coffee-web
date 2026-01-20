"use client";

import { useEffect, useState } from "react";

import { ChevronDown, ChevronLeft, CloudCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmationModal } from "@/components/confirmationModal/confirmationModal";
import LoadingComponent from "@/components/LoadingComponent/loading";
import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/queries/useFinishOrder";
import { useGetAllUserOrders } from "@/hooks/queries/useGetAllUserOrders";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [orderToFinish, setOrderToFinish] = useState<string | null>(null);
  const router = useRouter();
  const { data: orders, isLoading: loadingOrders } = useGetAllUserOrders(
    userId || "",
    1,
    20
  );
  const { mutate: finishOrderMutate, isPending: finishingOrder } =
    useFinishOrder();


  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) setUserId(stored);
  }, []);

  return (
    <main className="relative flex h-screen flex-col items-center justify-start px-16 pt-12">
      <ChevronLeft
        onClick={() => {
          router.back();
        }}
        className="absolute top-4 left-4 h-8 w-8 cursor-pointer text-[#AD4C24]"
        strokeWidth={4}
      />
      {loadingOrders ? (
        <div className="mt-5 flex w-full items-center justify-center">
          <LoadingComponent />
        </div>
      ) : orders && orders.length === 0 ? (
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-2">
          <p className="text-center text-lg text-gray-500">
            Nenhum pedido até agora
          </p>
        </div>
      ) : (
        orders?.map((order, index) => (
          <div
            key={order.orderShopId}
            onClick={() =>
              setSelectedOrder(
                selectedOrder === order.orderShopId ? null : order.orderShopId
              )
            }
            className="flex w-full flex-col items-center border-b-[0.5px] border-b-gray-200 py-4"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <ChevronDown
                  color="#57391D"
                  className={`transition-transform duration-200 ${selectedOrder === order.orderShopId ? "rotate-180" : ""}`}
                  size={20}
                  strokeWidth={3}
                />
                <p className="font-bold text-[#231F20]">
                  {`Pedido ${index + 1}`}
                </p>
              </div>
              {order.finishAt ? (
                <div className="flex items-center gap-2">
                  <CloudCheck color="#4CAF50" />
                  <p className="text-sm text-gray-500">
                    {new Date(order.finishAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              ) : selectedOrder === order.orderShopId ? (
                <Button
                  className="h-7 text-sm"
                  disabled={finishingOrder}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderToFinish(order.orderShopId);
                  }}
                >
                  Concluir
                </Button>
              ) : (
                <Button
                  className="h-7 text-sm"
                  variant="outline"
                  disabled={finishingOrder}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderToFinish(order.orderShopId);
                  }}
                >
                  Concluir
                </Button>
              )}
            </div>
            {order.orderShopId === selectedOrder && (
              <div className="mt-2 flex w-full flex-col gap-2">
                {order.items.map((item) => (
                  <div
                    className="flex w-full items-center justify-between"
                    key={item.orderItemId}
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-[#B35326]">•</p>
                      <div className="flex flex-col">
                        <p className="font-bold text-[#231F20]">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qtd: {item.amount} - R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {item.isBonus && (
                      <span className="rounded-full bg-[#B35326] px-2 py-1 text-xs font-semibold text-white">
                        Cashbônus
                      </span>
                    )}
                  </div>
                ))}
                <div className="mt-2 flex w-full justify-between border-t border-gray-200 pt-2">
                  <p className="font-bold text-[#231F20]">Total:</p>
                  <p className="text-xl font-bold text-[#B35326]">
                    R$ {order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))
      )}
      <ConfirmationModal
        open={!!orderToFinish}
        onOpenChange={(open) => !open && setOrderToFinish(null)}
        title="Deseja realmente concluir este pedido?"
        onConfirm={() => {
          if (orderToFinish) {
            finishOrderMutate(orderToFinish, {
              onSuccess: () => {
                toast.success("Pedido finalizado com sucesso!");
                setSelectedOrder(null);
                setOrderToFinish(null);
              },
              onError: () => {
                toast.error("Erro ao finalizar pedido");
                setOrderToFinish(null);
              }
            });
          }
        }}
      />
    </main>
  );
}
