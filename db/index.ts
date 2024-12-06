import "server-only";

import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { CWD } from "@/config";

const sqlite = new Database(path.join(CWD, "db", "db.sqlite"));

export const $db = drizzle({ client: sqlite });
