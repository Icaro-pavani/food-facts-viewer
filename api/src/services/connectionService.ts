import { db } from "../config/database.js";
import importsRepository from "../repositories/importsRepository.js";

async function gatherApiInfo() {
  const databaseConnection = isConnected();

  const lastImport = await importsRepository.getLastFileUpdate();
  const CRONTime = lastImport.importDate;
  const serverUptime = process.uptime();
  const memoryUsage = process.memoryUsage().heapTotal / 1024 / 1024;

  return {
    databaseConnection: databaseConnection ? "Ok!" : "Disconnected",
    CRONTime,
    serverUptime,
    memoryUsage: `${Math.round(memoryUsage * 100) / 100} MB`,
  };
}

async function isConnected() {
  if (!db) {
    return false;
  }

  try {
    await db.admin().ping();
    return true;
  } catch (error) {
    return false;
  }
}

const connectionService = { gatherApiInfo };
export default connectionService;
