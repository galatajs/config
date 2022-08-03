import { createConfig } from "./config.hooks";
import { PathsWithAppEnv, ProviderOptions } from "../types/provider.types";
import { ConfigOptions } from "../types/config.types";
import { checkConfigFile } from "./config-file.hooks";

const getDynamicConfig = (env: PathsWithAppEnv) => {
  const path = env.main;
  checkConfigFile(path);

  return path;
};

export const registerConfig = <O>(options: ProviderOptions) => {
  const config: ConfigOptions = createConfig(options);
};
