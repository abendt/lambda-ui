import {VIEW_BUILD_STEP, ADD_BUILD_DETAILS} from "actions/BuildDetailActions.es6";

export const BuildDetailsReducer = (oldState = {}, action) => {
    switch (action.type) {
        case ADD_BUILD_DETAILS: {
            const newObj = {};
            newObj[action.buildId] = action.buildDetails;
            return Object.assign({}, oldState, newObj);
        }

        default:
            return oldState;
    }
};

export const ViewBuildStepReducer = (oldState = {}, action) => {
    switch (action.type) {
        case VIEW_BUILD_STEP: {
            const newObj = {};
            newObj[action.buildId] = action.stepId;
            return Object.assign({}, oldState, newObj);
        }
        default:
            return oldState;
    }
};
