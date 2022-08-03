export type PathsWithAppEnv = {
  production?: string;
  development?: string;
  main: string;
  test?: string;
};

export function isPathWithAppEnv(env: any): env is PathsWithAppEnv {
  return typeof env === "object" && env.main;
}

export interface ProviderOptions {
  /**
   * The path to the config file.
   * @default ["./config/config.env"]
   * @type {string[]}
   * @memberof ProviderOptions
   * @example ["./config.json"]
   * @example ["./config.env"]
   * @example ["./config.yaml"]
   * @example ["./config.yml", "./config.env"]
   * @example ["./config.json", "./config.env", "./config.yml"]
   */
  paths: string[];
  useToApp?: boolean;
}
