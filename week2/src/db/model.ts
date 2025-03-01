import * as fs from "fs";
import * as path from "path";
import { v4, validate } from "uuid";

import { databasePath } from "../constants";
import { ModelData } from "../types";

Promise.all([])
  .then(() => {
    return [1, ""] as const;
  })
  .then(([num, str]) => {});

export class Model<T> {
  private data: ModelData<T> = {
    entries: [],
  };
  private syncCallbacks: ((error?: Error) => void)[] = [];
  protected readonly modelFilePath: string;
  private isSyncScheduled = false;

  constructor(private name: string) {
    this.modelFilePath = path.join(databasePath, this.name);
    try {
      if (fs.existsSync(this.modelFilePath)) {
        const content = fs.readFileSync(this.modelFilePath, {
          encoding: "utf-8",
        });
        this.data = JSON.parse(content);
      }
    } catch (e) {
      console.log(`Error reading database file: ${this.modelFilePath}`);
    }
  }

  insert(newEntry: T & { _id?: string }) {
    const newEntryObj = {
      _id: newEntry._id && validate(newEntry._id) ? newEntry._id : v4(),
      ...newEntry,
    };
    this.data.entries.push(newEntryObj);

    return new Promise((res, rej) => {
      this.scheduleSync((error) => {
        if (error) return rej(error);
        res(newEntryObj);
      });
    });
  }

  remove(id: string) {
    const idx = this.data.entries.findIndex((n) => n._id === id);
    const removed = this.data.entries[idx];
    this.data.entries.splice(idx, 1);
    return new Promise((res, rej) => {
      this.scheduleSync((error) => {
        if (error) return rej(error);
        res(removed);
      });
    });
  }

  private scheduleSync(cb: (error?: Error) => void) {
    this.syncCallbacks.push(cb);
    if (this.isSyncScheduled) return;
    this.isSyncScheduled = true;
    return Promise.resolve().then(() => {
      this.isSyncScheduled = false;
      this.syncFile()
        .then(() => {
          this.syncCallbacks.forEach((cb) => cb());
          this.syncCallbacks = [];
        })
        .catch((error) => {
          this.syncCallbacks.forEach((cb) => cb(error));
          this.syncCallbacks = [];
        });
    });
  }

  private syncFile() {
    return new Promise<void>((res, rej) => {
      fs.writeFile(this.modelFilePath, JSON.stringify(this.data), (err) => {
        if (err) return void rej(err);
        res();
      });
    });
  }
}
