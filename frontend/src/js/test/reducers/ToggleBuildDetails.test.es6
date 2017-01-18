/* globals describe it expect beforeEach afterEach */
import {toggleBuildDetails as action} from "../../main/actions/BuildDetailActions.es6";
import {ToggleBuildDetailsReducer as subject} from "../../main/reducers/ToggleBuildDetails.es6";
import * as TestUtils from "../../test/testsupport/TestUtils.es6";

describe("ToggleBuildDetails", () => {

    let realConsole;

    beforeEach(() => {
        TestUtils.consoleThrowingBefore(realConsole);
    });

    afterEach(() => {
        TestUtils.consoleThrowingAfter(realConsole);
    });

    describe("toggleBuildDetailsAction", () =>
        it("should create a proper action", () =>
            expect(action(2)).toEqual({type: "toggleBuildDetails", buildId: 2})));

    describe("ToggleBuildDetailsReduce", () => {
        it("should return true for a new buildId if ToggleBuildDetailsAction received", () => {
            expect(subject({}, action(3))).toEqual({3: true});
        });
        it("should return false for a build that was previously visible", () => {
            expect(subject({3: true}, action(3))).toEqual({3: false});
        });
        it("should not change state of other builds", () => {
            expect(subject({1: true}, action(2))).toEqual({1: true, 2: true});
        });
        it("should not return the same Object if a ToggleBuildDetailsAction was received", () => {
            const oldState = {};
            expect(subject(oldState, action(3))).not.toBe(oldState);
        });
        it("should return the same object if no relevant action was received", () => {
            const oldState = {};
            expect(subject(oldState, {type: "unrelated"})).toBe(oldState);
        });
    });
});
