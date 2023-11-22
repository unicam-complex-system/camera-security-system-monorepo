import { Test, TestingModule } from "@nestjs/testing";
import { StorageService } from "./storage.service";
import * as fs from "fs";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it("Should create file", () => {
    expect(service).toBeDefined();
    const path = service.secureSaveFile(new Date().toISOString(), "sample data test");
    expect(fs.existsSync(path)).toBeTruthy();
    fs.rmSync(path);
  });
});
