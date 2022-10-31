const test = require("node:test");
const assert = require("node:assert");
const { initConfiguration, getConfig, getRequiredConfig } = require("../dist");

global.__DEV__ = false;
global.__PROD__ = false;
global.__TEST__ = false;

test("Config Testing", async (t) => {
  await t.test("Check first config with .yaml", () => {
    initConfiguration({
      paths: ["/test/env/config.yaml"],
    });
    const serverConfig = getConfig("server");
    assert.equal(serverConfig.port, 8080);
    assert.strictEqual(serverConfig.host, "127.0.0.1");
  });

  await t.test("Check second config with .json", () => {
    initConfiguration({
      paths: ["/test/env/config.json"],
    });
    const databaseConfigs = getConfig("databases");
    assert.equal(databaseConfigs.redis.port, 6379);
    assert.strictEqual(databaseConfigs.redis.host, "localhost");
    assert.equal(databaseConfigs.mongodb.port, 27017);
    assert.equal(databaseConfigs.mongodb.host, "localhost");
    assert.equal(databaseConfigs.mongodb.database, "test");
  });

  await t.test("Check third config with .env", () => {
    initConfiguration({
      paths: ["/test/env/config.env"],
    });
    const envConfig = getConfig("NODE_ENV");
    assert.strictEqual(envConfig, "test");
  });

  await t.test("Test global __TEST__ field with an env with NODE_ENV", () => {
    assert.strictEqual(__TEST__, false);
    initConfiguration({
      paths: ["/test/env/config.env"],
      useToApp: true,
    });
    const envConfig = getConfig("NODE_ENV");
    assert.strictEqual(__TEST__, true);
    assert.strictEqual(envConfig, "test");
  });

  await t.test("check required config and handle an error", () => {
    initConfiguration({
      paths: ["/test/env/config.yaml"],
    });
    let config;
    const key = "server2";
    try {
      config = getRequiredConfig(key);
    } catch (e) {
      assert.equal(e.message, `GalataJS - Config ${key} is required`);
    }
  });
});
