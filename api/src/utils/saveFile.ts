import axios from "axios";
import zlib from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import { createWriteStream } from "fs";

export default async function saveFile(fileName: string) {
  const URL = `https://challenges.coode.sh/food/data/json/${fileName}.gz`;

  const pipelineAsync = promisify(pipeline);

  const getStream = async () => {
    try {
      const res = await axios.get(URL, { responseType: "stream" });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const httpStream = await getStream();

  await pipelineAsync(
    httpStream,
    zlib.createGunzip(),
    createWriteStream(`${fileName}`)
  );
}
