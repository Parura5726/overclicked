"use server";

import fs from "node:fs";

import { Mutex } from "async-mutex";
import { existsSync, readFileSync } from "node:fs";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import Database from "better-sqlite3";

export interface Order {
  id: number;
  amounts: number[];
  register: string;
  prepared: boolean;
  served: boolean;
}

function database() {
  const db = Database("db.sqlite");
  db.exec(fs.readFileSync("migration.sql").toString());
  return db;
}

function parseOrders(orders: any): Order[] {
  return orders.map((o: any) => ({ ...o, amounts: JSON.parse(o.amounts) }));
}

export async function addOrder(amounts: number[], register: string) {
  const db = database();
  db.prepare("INSERT INTO orders(amounts, register) VALUES(?, ?)").run([
    JSON.stringify(amounts),
    register,
  ]);
  db.close();
}

export async function getOrders(): Promise<Order[]> {
  const db = await database();
  const res = await db.prepare("SELECT * FROM orders").all();
  db.close();
  return res as Order[];
}

export async function getOrdersToPrepare(): Promise<Order[]> {
  return parseOrders(
    database().prepare("SELECT * FROM orders WHERE prepared = false;").all()
  );
}

export async function getOrdersToServe(register: string): Promise<Order[]> {
  return parseOrders(
    database()
      .prepare(
        "SELECT * FROM orders WHERE prepared = true AND served = false AND register = ?;"
      )
      .all([register])
  );
}

export async function markAsPrepared(id: number) {
  database()
    .prepare("UPDATE orders SET prepared = true WHERE id = ?;")
    .run([id]);
}

export async function markAsServed(id: number) {
  database()
    .prepare("UPDATE orders SET served = true WHERE id = ?;")
    .run([id]);
}
