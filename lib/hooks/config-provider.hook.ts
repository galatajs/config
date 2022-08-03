import { ProviderOptions } from "../types/provider.types";
import { getConfigFromFile } from "./config-file.hooks";
import { NodeEnvs } from "../types/types";
import { getParserFromPath } from "./parser.hooks";

const config: Map<string, any> = new Map();

declare global {
  var __TEST__: boolean;
  var __DEV__: boolean;
  var __PROD__: boolean;
}

const setAppEnv = (env: NodeEnvs): void => {
  global.__DEV__ = env === NodeEnvs.development;
  global.__PROD__ = env === NodeEnvs.production;
  global.__TEST__ = env === NodeEnvs.test;
};

const getEnvWithPath = (path: string) => {
  const parser = getParserFromPath(path);
  const config = getConfigFromFile(path, parser);
  return config;
};

const getAllEnv = (paths: string[]) => {
  const configs = paths.map(getEnvWithPath);
  return configs;
};

const setAllEnv = (paths: string[]) => {
  const configs = getAllEnv(paths);
  for (const c of configs) {
    if (c && typeof c === "object") {
      for (const [key, value] of Object.entries(c)) {
        config.set(key, value);
      }
    }
  }
};

export const getConfig = <T>(key: string): T | undefined => {
  if (config.has(key)) return config.get(key);
  return undefined;
};

export const getRequiredConfig = <T>(key: string): T => {
  const value = getConfig<T>(key);
  if (!value) throw new Error(`IstanbulJS - Config ${key} is required`);
  return value;
};

export const initConfiguration = (options: ProviderOptions) => {
  setAllEnv(options.paths);
  if (options.useToApp) {
    const env = getConfig<NodeEnvs>("NODE_ENV");
    if (!env) return;
    setAppEnv(env);
  }
};
