import { AuthGuard } from "./auth.guard";
import { JwtService } from "@nestjs/jwt";

describe("AuthGuard", () => {
  const payload = "complexUserNamePayload";
  let auth: AuthGuard;
  let jwtToken: string;

  beforeAll(async () => {
    const service = new JwtService({
      secret: "TestKey",
    });
    auth = new AuthGuard(service);
    jwtToken = await service.signAsync(payload);
  });

  it("should be defined", () => {
    expect(auth).toBeDefined();
    expect(jwtToken).toBeDefined();
  });

  it("Get Payload from token", async () => {
    const user = await auth.checkUser(jwtToken);
    expect(user).toBe(payload);
  });
});
