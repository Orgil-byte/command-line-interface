import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import schema from "./schema.json" with { type: "json" };
import Ajv from "ajv";
import betterAvjErrors from "better-ajv-errors";
import createLogger from "../logger.js";

const logger = createLogger("config:mgr");

const ajv = new Ajv();

const configLoader = cosmiconfigSync("tool");

export async function getConfig() {
  const result = configLoader.search(process.cwd());

  if (!result) {
    logger.warning("Could not find configuration, using default");
    return { port: 1234 };
  } else {
    const config = result.config?.default ?? result.config;

    const isValid = ajv.validate(schema, config);

    if (!isValid) {
      logger.warning("Invalid configuration was supplied");
      console.log(ajv.errors);
      console.log(betterAvjErrors(schema, config, ajv.errors));
      process.exit(1);
    }

    logger.log("Found configuration", config);
    return config;
  }
}
