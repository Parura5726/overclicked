"use client";

import OrderStatus from "@/components/OrderStatus";
import {
  Menu,
  Order,
  getMenus,
  getOrders,
  getOrdersToPrepare,
  markAsPrepared,
} from "@/data";
import { delay } from "@/utils";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState([] as Order[]);
  const [ordersToPrepare, setOrdersToPrepare] = useState([] as Order[]);
  const [menus, setMenus] = useState([] as Menu[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setOrdersToPrepare(await getOrdersToPrepare());
        setOrders(await getOrders());
        setMenus(await getMenus());
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
        {menus.map((m, i) => (
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
              <b>{m.stocks} </b>
              remaining
            </p>
          </div>
        ))}
      </div>
      <div className="orders">
        {menus.length == 0 ? (
          <></>
        ) : (
          ordersToPrepare.map((o) => (
            <OrderStatus
              key={o.id}
              menuItems={menus}
              order={o}
              buttonText="Prepared"
              buttonAction={markAsPrepared}
              showDetails={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
