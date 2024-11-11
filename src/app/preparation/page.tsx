"use client";

import OrderStatus from "@/components/OrderStatus";
import { Order, getOrders, getOrdersToPrepare, markAsPrepared } from "@/data";
import { MENUS } from "@/menus";
import { delay } from "@/utils";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState([] as Order[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setOrders(await getOrdersToPrepare());
        await delay(1000);
      }
    };

    fn();

    return () => {
      fetch = false;
    };
  }, []);

  return (
    <div className="preparation">
      {orders.map((o) => (
        <OrderStatus
          key={o.id}
          menuItems={MENUS}
          order={o}
          buttonText="Prepared"
          buttonAction={markAsPrepared}
          showDetails={false}
        />
      ))}
    </div>
  );
}
