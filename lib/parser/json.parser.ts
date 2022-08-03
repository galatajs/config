import { Parser } from "./parser";

export class JsonParser<T> implements Parser<T> {
  parse(input: string): T {
    return JSON.parse(input);
  }
}
