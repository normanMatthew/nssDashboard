import { describe, it, expect } from "vitest";

// Mock DB + Model
vi.mock("@/lib/utils", () => ({
  connectToDatabase: vi.fn().mockResolvedValue(undefined)
}));

vi.mock("@/lib/models/CiWebhookLog", () => ({
  default: {
    countDocuments: vi.fn().mockResolvedValue(1),
    find: vi.fn().mockReturnValue({
      sort: () => ({
        skip: () => ({
          limit: () => ({
            lean: () =>
              Promise.resolve([{ id: 1, status: "success" }])
          })
        })
      })
    })
  }
}));

import { GET } from "@/api/ci-logs/route";


describe("GET /api/ci-logs", () => {
    it("returns logs and totalPages", async () => {
        //mock request object
        const req = new Request("http://localhost/api/ci-logs");
        const res = await GET(req);
        const json = await res.json();

        expect(res.status).toBe(200);
        expect(json.logs.length).toBe(1)
        expect(json.logs.length).toBe(1);
    });
});