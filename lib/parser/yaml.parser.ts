import YAML from "yaml";
import { Parser } from "./parser";

export class YamlParser<T> implements Parser<T> {
  parse(input: string): T {
    return YAML.parse(input);
  }
}
