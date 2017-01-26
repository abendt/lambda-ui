/* globals describe it expect beforeEach afterEach */
import {OutputReducer as subject} from "../../main/reducers/Output.es6";
import {hideBuildOutput, showBuildOutput, changeTab, ADD_BUILDSTEP_OUTPUT} from "../../main/actions/OutputActions.es6";
import * as TestUtils from "../../test/testsupport/TestUtils.es6";

describe("Output", () => {

    let realConsole;

    beforeEach(() => {
        TestUtils.consoleThrowingBefore(realConsole);
    });

    afterEach(() => {
        TestUtils.consoleThrowingAfter(realConsole);
    });

    describe("Output reducer", () => {
        it("should return oldState if not SHOW_BUILD_OUTPUT action", () => {
            const oldState = {old: "state"};

            expect(subject(oldState, "someaction")).toBe(oldState);
        });

        it("set and override output to build and step of given action", () => {
            const oldState = {buildId: 1, stepId: 12};

            expect(subject(oldState, showBuildOutput(2, 1))).not.toBe(oldState);
            expect(subject(oldState, showBuildOutput(2, 1))).toEqual({showOutput: true, buildId: 2, stepId: 1, activeTab: "output"});
        });
    });

    describe("OutputReducer: addBuildstepOutput", () => {
        it("should add output to step if no output existed before.", () => {
            const oldState = {};
            const action = {type: ADD_BUILDSTEP_OUTPUT, buildId: 1, stepId: 2, output: ["output"]};
            const expected = {content: {1: {2: ["output"]}}};

            const actual = subject(oldState, action);

            expect(actual).not.toBe(oldState);
            expect(actual).toEqual(expected);
        });

        it("should replace output of step if output existed before.", () => {
            const oldState = {content: {1: {1: ["line 1"]}}};
            const action = {type: ADD_BUILDSTEP_OUTPUT, buildId: 1, stepId: 1, output: ["line 2"]};
            const expected = {content: {1: {1: ["line 2"]}}};

            expect(subject(oldState, action)).toEqual(expected);
        });

        it("should not remove other outputs", () => {
            const oldState = {content: {1: {1: ["line 1"]}}};
            const action = {type: ADD_BUILDSTEP_OUTPUT, buildId: 1, stepId: 2, output: ["line 2"]};
            const expected = {content: {1: {1: ["line 1"], 2: ["line 2"]}}};

            expect(subject(oldState, action)).toEqual(expected);
        });

    });

    describe("OutputReducer: hideBuildstepOutput", () => {
        it("should return oldState if no HIDE OUTPUT action was given", () => {
            //given
            const oldState = {old: "state"};

            //when
            const result = subject(oldState, {type: "NO HIDE OUTPUT ACTION"});

            //then
            expect(result).toBe(oldState);
        });

        it("should set showOutput value to false on HIDE OUTPUT action", () => {
            //given
            const oldState = {showOutput: true, some: "otherStuff"};

            //when
            const result = subject(oldState, hideBuildOutput());

            //then
            expect(result).not.toBe(oldState);
            expect(result).toEqual({showOutput: false, some: "otherStuff"});
        });
    });

    describe("OutputReducer: changeTab", () => {


        it("should change active tab", () => {
            const oldState = {activeTab: "oldTab"};

            const result = subject(oldState, changeTab("newTab"));

            expect(result).not.toBe(oldState);
            expect(result).toEqual({activeTab: "newTab"});
        });
    });
});