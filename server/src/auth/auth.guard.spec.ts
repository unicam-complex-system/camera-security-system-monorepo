import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";

describe("AuthGuard", () => {
  it("should be defined", () => {
    expect(new AuthGuard(new JwtService())).toBeDefined();
  });
});
