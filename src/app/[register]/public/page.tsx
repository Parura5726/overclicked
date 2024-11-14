"use client";

import { getMenus, getOrdersToServe, Menu, Order } from "@/data";
import { delay } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import menuCroques from "@public/menu-croques.svg";

export default function Public() {
  const params = useParams();
  const register = params["register"] as string;
  const [ordersToServe, setOrdersToServe] = useState([] as Order[]);
  const [menus, setMenus] = useState([] as Menu[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setOrdersToServe(await getOrdersToServe(register));
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
    <div className="public">
      <div className="menu">
        <img src={menuCroques.src} alt="Menu Croques" />
      </div>
      <div className="ready-orders">
        <h1>Ready for Pick Up</h1>
        {ordersToServe.length > 0 ? (
          ordersToServe.slice(0, 4).map((o) => (
            <div key={o.id} className="order">
              <h2>Order {o.id}</h2>
            </div>
          ))
        ) : (
          <p>No orders ready : please wait !</p>
        )}
      </div>
    </div>
  );
}
