"use client";

import { getOrders, Order } from "@/data";
import { MENUS } from "@/menus";
import { delay } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Public() {
  const params = useParams();
  const register = params["register"] as string;
  const [orders, setOrders] = useState([] as Order[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setOrders(await getOrders());
        await delay(1000);
      }
    };

    fn();

    return () => {
      fetch = false;
    };
  }, []);

  let pickupOrders = orders
    .filter((o) => o.register === register && o.prepared && !o.served)
    .map((o) => (
      <div key={o.id} className="order">
        <h2>Order {o.id}</h2>
      </div>
    ));

  return (
    <div className="public">
      <div className="menu">
        <h1>Menu</h1>
        {MENUS.map((m, i) => (
          <div key={i} className="menu-item">
            <h2>{m.name}</h2>
            <p>{m.description}</p>
          </div>
        ))}
        <div className="menu-info">Prix : 1CHF</div>
      </div>
      <div className="ready-orders">
        <h1>Ready for Pick Up</h1>
        {pickupOrders.length > 0 ? (
          pickupOrders.slice(0, 4)
        ) : (
          <p>No orders ready : please wait !</p>
        )}
      </div>
    </div>
  );
}
