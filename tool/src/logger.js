import chalk from "chalk";
import debug from "debug";

export default function createLogger(name) {
  return {
    log: (...arg) => console.log(chalk.gray(arg[0]), ...arg.slice(1)),
    warning: (...arg) => console.log(chalk.yellow(arg[0]), ...arg.slice(1)),
    highlight: (...arg) =>
      console.log(chalk.bgCyanBright(arg[0]), ...arg.slice(1)),
    debug: debug(name),
  };
}
