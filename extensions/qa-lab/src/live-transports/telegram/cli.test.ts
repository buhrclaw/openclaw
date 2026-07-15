import { describe, expect, it } from "vitest";
import { telegramQaCliRegistration } from "./cli.js";
import { resolveTelegramQaScenarioIds } from "./profiles.js";

describe("Telegram QA CLI registration", () => {
  it("keeps the generic live baseline outside command profile selection", () => {
    const commandScenarioIds = resolveTelegramQaScenarioIds({
      providerMode: "mock-openai",
      profile: "all",
    });

    expect(telegramQaCliRegistration.adapterFactory?.scenarioIds).toEqual([
      "channel-chat-baseline",
      ...commandScenarioIds,
    ]);
    expect(commandScenarioIds).not.toContain("channel-chat-baseline");
  });
});
