// Qa Lab plugin module implements cli behavior.
import {
  createLiveTransportQaAdapterFactory,
  createLazyCliRuntimeLoader,
  createLiveTransportQaCliRegistration,
  type LiveTransportQaCliRegistration,
  type LiveTransportQaCommandOptions,
} from "../shared/live-transport-cli.js";
import { TELEGRAM_QA_ADAPTER_DEFAULT_SCENARIO_IDS } from "./profiles.js";

const loadTelegramQaAdapterRuntime = createLazyCliRuntimeLoader<
  typeof import("./adapter.runtime.js")
>(() => import("./adapter.runtime.js"));
const loadTelegramQaCliRuntime = createLazyCliRuntimeLoader<typeof import("./cli.runtime.js")>(
  () => import("./cli.runtime.js"),
);

export const telegramQaCliRegistration: LiveTransportQaCliRegistration =
  createLiveTransportQaCliRegistration({
    commandName: "telegram",
    adapterFactory: createLiveTransportQaAdapterFactory({
      id: "telegram",
      scenarioIds: TELEGRAM_QA_ADAPTER_DEFAULT_SCENARIO_IDS,
      async create(context) {
        return (await loadTelegramQaAdapterRuntime()).createTelegramQaTransportAdapter(context);
      },
    }),
    credentialOptions: {
      sourceDescription: "Credential source for Telegram QA: env or convex (default: env)",
      roleDescription:
        "Credential role for convex auth: maintainer or ci (default: ci in CI, maintainer otherwise)",
    },
    description: "Run the manual Telegram live QA lane against a private bot-to-bot group harness",
    listScenariosHelp: "Print available Telegram scenario ids and exit",
    outputDirHelp: "Telegram QA artifact directory",
    profileHelp: "QA Lab Telegram profile: release or all (default: release)",
    async run(opts: LiveTransportQaCommandOptions) {
      await (await loadTelegramQaCliRuntime()).runQaTelegramCommand(opts);
    },
    scenarioHelp: "Run only the named Telegram QA scenario (repeatable)",
    sutAccountHelp: "Temporary Telegram account id inside the QA gateway config",
  });
