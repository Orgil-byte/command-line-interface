import chalk from "chalk";
import { packageUp } from "package-up";

export async function getConfig() {
  const pkgPath = await packageUp({ cwd: process.cwd() });
  const pkg = JSON.parse((await import("fs")).readFileSync(pkgPath, "utf8"));
  if (pkg.tool) {
    console.log("Found configuration", pkg.tool);
    return pkg.tool;
  } else {
    console.log(chalk.yellow("Could not find configuration, using default"));
    return { port: 1234 };
  }
}
