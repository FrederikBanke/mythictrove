// db.js
import Dexie, { Table, } from "dexie";
import { IProject, } from "types/projects";

export class ProjectsDexie extends Dexie {
    // 'projects' is added by dexie when declaring the stores()
    // We just tell the typing system this is the case
    projects!: Table<IProject>;

    constructor() {
        super("mythicTrove");
        this.version(1).stores({
            projects: "++id, name", // Primary key and indexed props
        });
    }
}

export const db = new ProjectsDexie();
