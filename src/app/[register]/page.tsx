"use client";

import MenuSelect from "@/components/MenuSelect";
import OrderStatus from "@/components/OrderStatus";
import { addOrder, Order, getOrders, markAsServed } from "@/data";
import { MENUS } from "@/menus";
import { delay } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
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

  const [currentOrder, setCurrentOrder] = useState(
    new Array(MENUS.length).fill(0)
  );

  return (
    <div className="register">
      <div className="register-select">
        <div className="menu-selections">
          {MENUS.map((m, i) => (
            <MenuSelect
              key={i}
              menu={m}
              numSelects={currentOrder[i]}
              remaining={
                m.initialStock -
                orders.reduce((acc, o) => acc + o.amounts[i], 0)
              }
              addSelect={() => {
                const newOrder = [...currentOrder];
                newOrder[i] += 1;
                setCurrentOrder(newOrder);
              }}
              removeSelect={() => {
                const newOrder = [...currentOrder];
                newOrder[i] -= 1;
                setCurrentOrder(newOrder);
              }}
            />
          ))}
        </div>
        <button
          onClick={async () => {
            await addOrder(currentOrder, register);
            setCurrentOrder(new Array(MENUS.length).fill(0));
          }}
        >
          Send Order
        </button>
      </div>
      <div className="register-orders">
        <h1>Register {register}</h1>
        <button
          className="admin-button"
          onClick={() => {
            window.location.href = `/`;
          }}
        >
          Admin
        </button>
        {orders
          .filter((o) => o.register === register)
          .sort((a, b) => {
            if (a.served !== b.served) return a.served ? 1 : -1;
            if (a.prepared !== b.prepared) return a.prepared ? -1 : 1;
            return b.id - a.id;
          })
          .map((o) => (
            <OrderStatus
              key={o.id}
              menuItems={MENUS}
              order={o}
              buttonText="Serve"
              buttonAction={markAsServed}
              actionAvailable={o.prepared && !o.served}
              showDetails={false}
              showRegister={false}
              archived={o.served}
              statusIcon={o.served ? "✅" : o.prepared ? "🥪❗" : "⏳"}
            />
          ))}
      </div>
    </div>
  );
}
