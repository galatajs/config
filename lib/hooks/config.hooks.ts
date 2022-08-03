import { ConfigOptions } from "../types/config.types";
import {
  isPathWithAppEnv,
  PathsWithAppEnv,
  ProviderOptions,
} from "../types/provider.types";
import { getParserFromPath } from "./parser.hooks";

const createDefaultConfig = (path?: string): PathsWithAppEnv => {
  return {
    main: path || "./config/config.env",
    development: "./config/config.env.development",
    production: "./config/config.env.production",
    test: "./config/config.env.test",
  };
};

export const createConfig = (options: ProviderOptions): ConfigOptions => {
  const { useToApp, parser } = options;
  const paths = isPathWithAppEnv(options.path)
    ? options.path
    : createDefaultConfig(options.path);

  const parserInstance = parser || getParserFromPath(paths.main);
  return {
    paths,
    useToApp: useToApp || true,
    parser: parserInstance,
  };
};
