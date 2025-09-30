"use client";

import { useState } from "react";

import { ChevronDown, CloudCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { orders } from "@/lib/mockup/constants";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  return (
    <main className="relative flex h-screen flex-col items-center justify-start px-16 pt-12">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() =>
            setSelectedOrder(selectedOrder === order.id ? null : order.id)
          }
          className="flex w-full flex-col items-center border-b-[0.5px] border-b-gray-200 py-4"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <ChevronDown
                color="#57391D"
                className={`transition-transform duration-200 ${selectedOrder === order.id ? "rotate-180" : ""}`}
                size={20}
                strokeWidth={3}
              />
              <p className="font-bold text-[#231F20]">{order.id}</p>
            </div>
            {selectedOrder === order.id ? (
              <Button className="h-7 text-sm">Concluir</Button>
            ) : (
              <CloudCheck />
            )}
          </div>
          {order.id === selectedOrder && (
            <div className="ml-14 flex w-full flex-col justify-start py-1">
              {order.items.map((item) => (
                <div className="flex gap-1" key={item}>
                  <p className="font-bold text-[#B35326]">•</p>
                  <p className="font-bold text-[#231F20]">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
