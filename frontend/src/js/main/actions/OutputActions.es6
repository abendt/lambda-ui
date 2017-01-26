export const HIDE_BUILD_OUTPUT = "hideBuildOutput";
export const ADD_BUILDSTEP_OUTPUT = "addBuildstepOutput";
export const OUTPUT_CONNECTION_STATE = "outputConnectionState";
export const SHOW_BUILD_OUTPUT = "showOutput";
export const CHANGE_TAB = "openTab";

export const hideBuildOutput = () => {
    return {type: HIDE_BUILD_OUTPUT};
};

export const addBuildstepOutput = (buildId, stepId, output) => {
    return {type: ADD_BUILDSTEP_OUTPUT, buildId: buildId, stepId: stepId, output: output};
};

export const outputConnectionState = (connectionState) => {
    return {type: OUTPUT_CONNECTION_STATE, state: connectionState};
};

export const showBuildOutput = (buildId, stepId) => {
    return {type: SHOW_BUILD_OUTPUT, buildId: buildId, stepId: stepId};
};

export const changeTab = (tabName) => {
    return {type: CHANGE_TAB, tabName: tabName};
};