"use client";

import { addCommand, Command, getCommands } from "@/data";
import { MENUS } from "@/menus";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
        <div>
          <p>{m.name}</p>
          <button
            onClick={() => {
              const newCommand = [...currentCommand];
              newCommand[i] += 1;
              setCurrentCommand(newCommand);
            }}
          >
            Add
          </button>
          <p>{currentCommand[i]}</p>
        </div>
      ))}
      <button
        onClick={async () => {
          await addCommand(currentCommand, register);
          setCurrentCommand(new Array(MENUS.length).fill(0));
        }}
      >
        Save
      </button>
      <p>{JSON.stringify(commands)}</p>
    </div>
  );
}
