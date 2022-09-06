import React from "react";
import { Client, OnboardingStep, ClientThemeSettings } from "../pages/api/mockDatabase/databaseHelpers";

type ClientContextType = {
    currentClient: Client | null;
    currentStep: OnboardingStep | undefined;
    currentStepIndex: number;
    clientSettings: ClientThemeSettings | undefined;
}

const clientCtx : ClientContextType = {
    currentClient: null,
    currentStep: undefined,
    currentStepIndex: 0,
    clientSettings: undefined,
}
const ClientContext = React.createContext(clientCtx)
export default ClientContext;