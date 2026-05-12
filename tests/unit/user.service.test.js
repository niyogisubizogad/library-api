import { describe, jest, expect, test, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../src/repositories/userRepository.js", () => ({
  create: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
}));
const repository = await import("../../src/repositories/userRepository.js");
const service = await import("../../src/services/userService.js");
process.env.JWT_SECRET = "testsecret";

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createNewUser(data)", () => {
    test("register user", async () => {
      const payload ={
        name: "Justin",
        email: "intentions@jb.com",
        password: "beiber@123",
      };
      const data = { id: 1, ...payload, role: "member" };
      repository.create.mockResolvedValue(data);

      const result = await service.createNewUser(payload);
      expect(repository.create).toHaveBeenCalled();
      expect(result).toEqual(data);
    });
  });
  describe("login(email)", () => {
    test("logging in user", async () => {
      const mockUser = {
        dataValues:{id: 1,
        name: "Justin",
        email: "intentions@jb.com",
        passwordHash: "beiber@123",
        createdAt:new Date(),
        role: "member",
      }};

      const payload ={
        email: "intentions@jb.com",
        password: "beiber@123",
      };
      repository.findByEmail.mockResolvedValue(mockUser);
      const result = await service.login(payload.email);
      expect(repository.findByEmail).toHaveBeenCalled();
      expect(result).toHaveProperty("token");
      expect(result).not.toHaveProperty("passwordHash");
    });
  });
  describe("findUserById(id)", ()=>{

    test("getting one user by id", async()=>{
      const mockUser = {
        dataValues: {
          id: 1,
          name: "Justin",
          email: "intentions@jb.com",
          createdAt: new Date(),
          role: "member",
        },
      };

      repository.findById.mockResolvedValue(mockUser);

      const result = await service.findUserById(mockUser.dataValues.id);
      expect(result).toBeDefined()
      expect(repository.findById).toHaveBeenCalledWith(1);
      expect(result.dataValues).not.toHaveProperty("passwordHash")
    })
     })
});
