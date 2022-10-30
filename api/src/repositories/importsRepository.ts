import { ObjectId } from "mongodb";
import { db } from "../config/database.js";

export interface Import {
  _id: ObjectId;
  fileName: string;
  importDate: Date;
}

async function getLastFileUpdate() {
  return db
    .collection<Import>("imports")
    .findOne({ fileName: "products_09.json" });
}

const importsRepository = { getLastFileUpdate };

export default importsRepository;
