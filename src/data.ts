"use server";

import fs from "node:fs/promises";

import { Mutex } from "async-mutex";
import { existsSync, readFileSync } from "node:fs";

export interface Command {
  id: number;
  amounts: number[];
  prepared: boolean;
  given: boolean;
}

var lock = new Mutex();
var seq = 0;
var commands: Command[] = [];
var types: string[] = [];

if (existsSync("db.json")) {
  commands = JSON.parse(readFileSync("db.json").toString());
}

export async function addCommand(amounts: number[]) {
  await lock.runExclusive(async () => {
    commands.push({
      id: seq,
      amounts,
      prepared: false,
      given: false,
    });

    seq += 1;

    await save();
  });
}

export async function getCommands(): Promise<Command[]> {
  return commands;
}

async function save() {
  await fs.writeFile("db.json", JSON.stringify(commands));
}
