"use client";

import {
  Command,
  getCommands,
  getCommandToPrepare,
  markAsPrepared,
} from "@/data";
import { delay } from "@/utils";
import { useEffect, useState } from "react";

export default function Page() {
  const [commands, setCommands] = useState([] as Command[]);

  useEffect(() => {
    let fetch = true;
    let fn = async () => {
      while (fetch) {
        setCommands(await getCommandToPrepare());
        await delay(1000);
      }
    };

    fn();

    return () => {
      fetch = false;
    };
  }, []);

  return (
    <div>
      {commands.map((c) => (
        <div>
          <p>{c.amounts}</p>
          <button onClick={() => markAsPrepared(c.id)}>Prepared</button>
        </div>
      ))}
    </div>
  );
}
