import { describe, expect, it } from "vitest";
import { telegramQaCliRegistration } from "./cli.js";
import {
  resolveTelegramQaScenarioIds,
  TELEGRAM_QA_ADAPTER_DEFAULT_SCENARIO_IDS,
} from "./profiles.js";

describe("Telegram QA CLI registration", () => {
  it("keeps the generic live baseline outside command profile selection", () => {
    expect(telegramQaCliRegistration.adapterFactory?.scenarioIds).toEqual(
      TELEGRAM_QA_ADAPTER_DEFAULT_SCENARIO_IDS,
    );
    expect(
      resolveTelegramQaScenarioIds({ providerMode: "mock-openai", profile: "all" }),
    ).not.toContain("channel-chat-baseline");
  });
});
