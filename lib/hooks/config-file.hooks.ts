import fs from "node:fs";
import nodePath from "node:path";
import { Parser } from "../parser/parser";

export const getConfigFile = (path: string): string => {
  return fs.readFileSync(path, "utf8");
};

export const checkFile = (path: string): boolean => {
  return fs.existsSync(path);
};

export const checkConfigFile = (path: string): boolean => {
  if (!checkFile(path))
    throw new Error(`GalataJS - Config file ${path} not found`);
  return true;
};

export const getConfigFromFile = <T>(path: string, parser: Parser<T>): T => {
  const filePath = nodePath.join(process.cwd(), path);
  checkConfigFile(filePath);
  return parser.parse(getConfigFile(filePath));
};
