import { describe, it, expect } from "vitest";
import { Crmpilot } from "../src/core.js";
describe("Crmpilot", () => {
  it("init", () => { expect(new Crmpilot().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Crmpilot(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Crmpilot(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
