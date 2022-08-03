import { Parser } from "../parser/parser";
import { PathsWithAppEnv } from "./provider.types";

export interface ConfigOptions {
  paths: PathsWithAppEnv;
  useToApp: boolean;
  parser: Parser<any>;
}
