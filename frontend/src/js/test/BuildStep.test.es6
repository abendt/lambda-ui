/* globals jest describe expect it */
jest.mock("../main/actions/BuildDetailActions.es6");
jest.mock("../main/actions/OutputActions.es6");
import {viewBuildStep} from "actions/BuildDetailActions.es6";
import {showBuildOutput} from "actions/OutputActions.es6";
import React from "react";
import {shallow, mount} from "enzyme";
import BuildStepRedux, {BuildStep, getStepDuration, duration} from "BuildStep.es6";
import {MockStore} from "./testsupport/TestSupport.es6";


const details = newAttributes => Object.assign({stepId: 1, state: "success", name: "fooStep"}, newAttributes);

describe("BuildStep rendering", () => {
    it("should render all step information", () => {
        const input = details();

        const component = shallow(<BuildStep buildId={1} step={input}/>);

        expect(component.find(".stepName").text()).toEqual("fooStep");
        expect(component.find(".buildStep").hasClass("success")).toBe(true);
    });

    it("should render failed step state", () => {
        const component = shallow(<BuildStep buildId={1} step={details({state: "failed"})}/>);
        expect(component.find(".buildStep").hasClass("failed")).toBe(true);
    });

    it("should render running step state", () => {
        const component = shallow(<BuildStep buildId={1} step={details({state: "running"})}/>);
        expect(component.find(".buildStep").hasClass("running")).toBe(true);
    });

    it("should render pending step state", () => {
        const component = shallow(<BuildStep buildId={1} step={details({state: "pending"})}/>);
        expect(component.find(".buildStep").hasClass("pending")).toBe(true);
    });

    it("should render link if step has substeps", () => {
        const substeps = {steps: [{stepId: "1.1"}]};

        const component = shallow(<BuildStep buildId={1} step={details(substeps)}/>);

        expect(component.find(".goIntoStepLink").length).toBe(1);
    });

    it("should render output link", () => {
        const component = shallow(<BuildStep buildId={1} step={details()}/>);

        expect(component.find(".showOutputLink").length).toBe(1);
    });
});

describe("BuildStep wiring", () => {
    it("should dispatch go into step action on link click", () => {
        const dispatchMock = jest.fn();
        const storeMock = MockStore({}, dispatchMock);
        const substeps = {steps: [{stepId: "1-1"}]};
        viewBuildStep.mockReturnValue({type: "stepInto"});

        const component = mount(<BuildStepRedux buildId={1} step={details(substeps)} store={storeMock}/>);
        component.find(".goIntoStepLink").simulate("click");

        expect(dispatchMock).toBeCalledWith({type: "stepInto"});
    });

    it("should dispatch show output action on link click", () => {
        const dispatchMock = jest.fn();
        const storeMock = MockStore({}, dispatchMock);
        showBuildOutput.mockReturnValue({type: "showOutput"});

        const component = mount(<BuildStepRedux buildId={1} step={details()} store={storeMock}/>);
        component.find(".showOutputLink").simulate("click");

        expect(dispatchMock).toBeCalledWith({type: "showOutput"});
    });
});

describe("BuildStep duration", () => {
    it("should return same step, when endTime available", () => {
        const step = {startTime: "24:00:00", endTime: "24:00:32"};
        expect(getStepDuration(step)).toBe(step);
    });

    it("should return same step, when startTime is null", () => {
        const step = {startTime: null, endTime: null};
        expect(getStepDuration(step)).toBe(step);
    });

    it("should return step with other endTime, when endTime is null", () => {
        const step = {startTime: "24:00:00", endTime: null};
        expect(getStepDuration(step).endTime).not.toEqual(null);
    });

    it("should return in mm:ss format, when duration less then one houre", () => {
        expect(duration({startTime: "2016-11-01T14:48:16", endTime: "2016-11-01T14:48:21"})).toEqual("00:05");
        expect(duration({startTime: "2016-11-01T14:47:16", endTime: "2016-11-01T14:48:26"})).toEqual("01:10");
        expect(duration({startTime: "2016-11-01T14:38:16", endTime: "2016-11-01T14:48:51"})).toEqual("10:35");
    });

    it("should return in hh:mm:ss format, when duration more then one houre", () => {
        expect(duration({startTime: "2016-11-01T13:48:16", endTime: "2016-11-01T14:48:21"})).toEqual("01:00:05");
        expect(duration({startTime: "2016-11-01T04:47:16", endTime: "2016-11-01T14:48:26"})).toEqual("10:01:10");
        expect(duration({startTime: "2016-11-01T00:38:16", endTime: "2016-11-01T14:48:51"})).toEqual("14:10:35");
    });
})


