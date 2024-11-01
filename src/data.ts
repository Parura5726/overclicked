"use server";

import fs from "node:fs/promises";

import { Mutex } from "async-mutex";
import { existsSync, readFileSync } from "node:fs";

export interface Command {
  id: number;
  amounts: number[];
  register: string;
  prepared: boolean;
  served: boolean;
}

var lock = new Mutex();
var seq = 0;
var commands: Command[] = [];
var types: string[] = [];

if (existsSync("db.json")) {
  commands = JSON.parse(readFileSync("db.json").toString());
}

export async function addCommand(amounts: number[], register: string) {
  await lock.runExclusive(async () => {
    commands.push({
      id: seq,
      amounts,
      register,
      prepared: false,
      served: false,
    });

    seq += 1;

    await save();
  });
}

export async function getCommands(): Promise<Command[]> {
  return commands;
}

export async function getCommandToPrepare(): Promise<Command[]> {
  return commands.filter((c) => c.prepared);
}

export async function getCommandToServe(register: string): Promise<Command[]> {
  return commands.filter(
    (c) => c.prepared && !c.served && c.register == register
  );
}

export async function markAsPrepared(id: number) {
  await lock.runExclusive(async () => {
    const command = commands.find((c) => c.id == id);
    if (command) {
      command.prepared = true;
      await save();
    }
  });
}

export async function markAsServed(id: number) {
  await lock.runExclusive(async () => {
    const command = commands.find((c) => c.id == id);
    if (command) {
      command.served = true;
      await save();
    }
  });
}

async function save() {
  await fs.writeFile("db.json", JSON.stringify(commands));
}
