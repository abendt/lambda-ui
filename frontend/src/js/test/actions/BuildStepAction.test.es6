/* globals describe it expect beforeEach afterEach */
import * as subject from "../../main/actions/BuildStepActions.es6";
import * as TestUtils from "../../test/testsupport/TestUtils.es6";

describe("BuildStepActions", () => {

    let realConsole;

    beforeEach(() => {
        TestUtils.consoleThrowingBefore(realConsole);
    });

    afterEach(() => {
        TestUtils.consoleThrowingAfter(realConsole);
    });

    it("should return toggleToolbox action object", () => {
        const newAction = subject.toggleStepToolbox(1, "1");
        expect(newAction).toEqual({
            type: "toggleStepToolbox",
            buildId: 1, stepId: "1"
        });
    });

    it("should return toggleSubstep action object", () => {
        const newAction = subject.toggleSubstep(1, "1");
        expect(newAction).toEqual({
            type: "toggleSubsteps",
            buildId: 1, stepId: "1"
        });
    });

    it("should return openSubsteps action object", () => {
        const newAction = subject.openSubsteps(1, "1");
        expect(newAction).toEqual({
            type: "openSubsteps",
            buildId: 1, stepId: "1"
        });
    });
});