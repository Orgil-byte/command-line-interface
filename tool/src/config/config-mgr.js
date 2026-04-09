import chalk from "chalk";
import { cosmiconfigSync } from "cosmiconfig";
import schema from "./schema.json" with { type: "json" };
import Ajv from "ajv";

const ajv = new Ajv();

const configLoader = cosmiconfigSync("tool");

export async function getConfig() {
  const result = configLoader.search(process.cwd());

  if (!result) {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  } else {
    const config = result.config?.default ?? result.config;

    const isValid = ajv.validate(schema, result.config);

    if (!isValid) {
      console.log(chalk.yellow("Invalid configuration was supplied"));
      console.log(ajv.errors);
      process.exit(1);
    }

    console.log("Found configuration", config);
    return config;
  }
}
