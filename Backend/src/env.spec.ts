/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

describe("FiltersPipe", () => {
  it("MONGO_INITDB_ROOT_USERNAME should be defined", () => {
    expect(process.env.MONGO_INITDB_ROOT_USERNAME).toBeDefined();
  });
  it("MONGO_INITDB_ROOT_PASSWORD should be defined", () => {
    expect(process.env.MONGO_INITDB_ROOT_PASSWORD).toBeDefined();
  });
  it("JWT_SECRET should be defined", () => {
    expect(process.env.JWT_SECRET).toBeDefined();
  });
  it("CSD_USER should be defined", () => {
    expect(process.env.CSD_USER).toBeDefined();
  });
  it("CSD_PASSWORD should be defined", () => {
    expect(process.env.CSD_PASSWORD).toBeDefined();
  });
  it("TELEGRAM_TOKEN should be defined", () => {
    expect(process.env.TELEGRAM_TOKEN).toBeDefined();
  });
  it("MONGO_HOST should be defined", () => {
    expect(process.env.MONGO_HOST).toBeDefined();
  });
});
