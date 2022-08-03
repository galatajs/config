import { createModule, Module } from "@istanbul/app";
import { ConfigService } from "./config.service";

export const registerConfigModule = (): Module => {
  const moduleName = `configModule`;
  return createModule(`${moduleName}Module`, {
    providers: [ConfigService],
    exports: [ConfigService],
  });
};
