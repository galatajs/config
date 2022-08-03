import fs from "node:fs";
import nodePath from "node:path";
import { Parser } from "../parser/parser";
import { NodeEnvs } from "../types/types";

export const getConfigFile = (path: string): string => {
  return fs.readFileSync(path, "utf8");
};

const setAppEnv = (env: NodeEnvs): void => {
  global.__DEV__ = env === NodeEnvs.development;
  global.__PROD__ = env === NodeEnvs.production;
  global.__TEST__ = env === NodeEnvs.test;
};

export const checkFile = (path: string): boolean => {
  return fs.existsSync(path);
};

export const checkConfigFile = (path: string): boolean => {
  if (!checkFile(path))
    throw new Error(`IstanbulJS - Config file ${path} not found`);
  return true;
};

export const getConfigFromFile = <T>(path: string, parser: Parser<T>): T => {
  const filePath = nodePath.join(process.cwd(), path);
  checkConfigFile(filePath);
  return parser.parse(getConfigFile(filePath));
};
