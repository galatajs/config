import { Parser } from "../parser/parser";
import { DotenvParser } from "../parser/dotenv.parser";
import { JsonParser } from "../parser/json.parser";
import { YamlParser } from "../parser/yaml.parser";

const getParserForExtension = <T>(
  extension: string
): Parser<T | Record<string, string>> => {
  switch (extension) {
    case "json":
      return new JsonParser<T>();
    case "yml":
      return new YamlParser<T>();
    case "env":
      return new DotenvParser();
    default:
      throw new Error(`No parser for extension ${extension}`);
  }
};

export const getParserFromPath = <T>(
  path: string
): Parser<T | Record<string, string>> => {
  const extension = path.split(".").pop();
  if (!extension) {
    throw new Error(`No extension found in path ${path}`);
  }
  return getParserForExtension<T>(extension);
};
