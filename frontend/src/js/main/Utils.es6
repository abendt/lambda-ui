/* global Promise */
import R from "ramda";

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const allSteps = step => {
    if (!step.steps || step.steps.length === 0) {
        return step;
    }
    const subs = R.map(allSteps)(step.steps);
    return [step, subs];
};


export const flatSteps = (input) => {
    const isStep = (step) => step.stepId;
    return R.pipe(R.filter((i) => i), R.map(allSteps), R.flatten, R.filter(isStep))([input]);
};

export const isRunning = state => {
    return state === "waiting" || state === "running";
};

export const isBuildRunning = buildDetails => {
    const steps = flatSteps(buildDetails);

    const runningOrWaitingSteps = R.pipe(R.map(step => step.state), R.filter(isRunning))(steps);
    return ! R.isEmpty(runningOrWaitingSteps);
};