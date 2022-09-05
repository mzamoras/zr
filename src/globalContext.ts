import React from "react";
const stepsCtx = {
    canGoNext: true,
    toggleCanGoNext: () => {},
}
const StepsContext = React.createContext(stepsCtx)
export default StepsContext;