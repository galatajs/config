import { Parser } from "./parser";

export class DotenvParser implements Parser<Record<string, string>> {
  /**
   * @description Parses the input string of .env file into an object.
   */
  /* A function that takes a string and returns an object. */
  parse(input: string): Record<string, string> {
    const lines = input.split("\n");
    const result: Record<string, string> = {};
    lines.forEach((line) => {
      const [key, value] = line.split("=");
      result[key] = value;
    });
    return result;
  }
}
