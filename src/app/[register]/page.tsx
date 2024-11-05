"use client";

import MenuSelect from "@/components/MenuSelect";
import { addOrder, Order, getOrders } from "@/data";
import { MENUS } from "@/menus";
import { delay } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const register = params["register"] as string;
  const [commands, setCommands] = useState([] as Order[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setCommands(await getOrders());
        await delay(1000);
      }
    };

    fn();

    return () => {
      fetch = false;
    };
  }, []);

  const [currentCommand, setCurrentCommand] = useState(
    new Array(MENUS.length).fill(0)
  );

  return (
    <div>
      <div className="menu-selections">
        {MENUS.map((m, i) => (
          <MenuSelect
            key={i}
            menu={m}
            numSelects={currentCommand[i]}
            addSelect={() => {
              const newCommand = [...currentCommand];
              newCommand[i] += 1;
              setCurrentCommand(newCommand);
            }}
            removeSelect={() => {
              const newCommand = [...currentCommand];
              newCommand[i] -= 1;
              setCurrentCommand(newCommand);
            }}
          />
        ))}
      </div>
      <button
        onClick={async () => {
          await addOrder(currentCommand, register);
          setCurrentCommand(new Array(MENUS.length).fill(0));
        }}
      >
        Send Order
      </button>
      <p>{JSON.stringify(commands)}</p>
    </div>
  );
}
