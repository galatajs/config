import { Parser } from "../parser/parser";
import { createConfig } from "./config.hooks";
import { PathsWithAppEnv, ProviderOptions } from "../types/provider.types";
import { ConfigOptions } from "../types/config.types";
import { checkConfigFile, getConfigFromFile } from "./config-file.hooks";
import { NodeEnvs } from "../types/types";

const setAppEnv = (env: NodeEnvs): void => {
  global.__DEV__ = env === NodeEnvs.development;
  global.__PROD__ = env === NodeEnvs.production;
  global.__TEST__ = env === NodeEnvs.test;
};

const getDynamicConfig = <P>(env: PathsWithAppEnv, parser: Parser<P>) => {
  const path = env.main;
  checkConfigFile(path);
  const _env = getConfigFromFile<P>(path, parser);
  if (!!_env && !!_env['NODE_ENV']) {
    
  }
  return path;
};

export const registerConfig = <O>(options: ProviderOptions) => {
  const config: ConfigOptions = createConfig(options);
};
