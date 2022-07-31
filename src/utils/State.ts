import React from "react";
import {createGlobalState} from "react-hooks-global-state";

const simpleState = {
    hourlyData: null,
    dailyData: null,
    textLocation: null
}

const { useGlobalState } = createGlobalState(simpleState);

export default useGlobalState;