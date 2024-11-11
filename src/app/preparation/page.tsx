"use client";

import OrderStatus from "@/components/OrderStatus";
import { Order, getOrders, getOrdersToPrepare, markAsPrepared } from "@/data";
import { MENUS } from "@/menus";
import { delay } from "@/utils";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState([] as Order[]);
  const [ordersToPrepare, setOrdersToPrepare] = useState([] as Order[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setOrdersToPrepare(await getOrdersToPrepare());
        setOrders(await getOrders());
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
      <div className="stats">
        {MENUS.map((m, i) => (
          <div key={i} className="stat">
            <h2>{m.name}</h2>
            <p>{m.description}</p>
            <p>
              <b>
                {ordersToPrepare.reduce((acc, o) => acc + o.amounts[i], 0)}{" "}
              </b>
              to prepare
            </p>
            <p>
              <b>
                {m.initialStock -
                  orders.reduce((acc, o) => acc + o.amounts[i], 0)}{" "}
              </b>
              remaining
            </p>
          </div>
        ))}
      </div>
      <div className="orders">
        {ordersToPrepare.map((o) => (
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
    </div>
  );
}
