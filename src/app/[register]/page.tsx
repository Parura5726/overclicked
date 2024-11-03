"use client";

import MenuSelect from "@/components/MenuSelect";
import { addCommand, Command, getCommands } from "@/data";
import { MENUS } from "@/menus";
import { delay } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const register = params["register"] as string;
  const [commands, setCommands] = useState([] as Command[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setCommands(await getCommands());
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
      {MENUS.map((m, i) => (
        <MenuSelect
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
      <button
        onClick={async () => {
          await addCommand(currentCommand, register);
          setCurrentCommand(new Array(MENUS.length).fill(0));
        }}
      >
        Send Order
      </button>
      <p>{JSON.stringify(commands)}</p>
    </div>
  );
}
