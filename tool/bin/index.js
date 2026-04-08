#!/usr/bin/env node
import arg from "arg";
import chalk from "chalk";
import { packageUp } from "package-up";

try {
  const args = arg({
    "--start": Boolean,
    "--build": Boolean,
  });

  if (args["--start"]) {
    const pkgPath = await packageUp({ cwd: process.cwd() });
    const pkg = JSON.parse((await import("fs")).readFileSync(pkgPath, "utf8"));

    if (pkg.tool) {
      console.log("Found configuration", pkg.tool);
    } else {
      console.log(chalk.yellow("Could not find configuration, using default"));
    }

    console.log(chalk.italic.black.bgGreen("starting the app"));
  }
} catch (e) {
  console.log(chalk.red(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(
    chalk.bgYellow.black(`
tool [CMD]
  --start    Starts the app
  --build    Builds the app
  `),
  );
}
