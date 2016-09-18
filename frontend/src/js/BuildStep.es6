import React, {PropTypes} from "react";
import {connect} from "react-redux";
import Moment from "moment";
import Utils from "./ComponentUtils.es6";
import "moment-duration-format";
import {viewBuildStep, showBuildOutput} from "./Actions.es6";

const duration = ({startTime, endTime}) => {
  const start = Moment(startTime);
  const end = Moment(endTime);

  const duration = Moment.duration(end.diff(start), "milliseconds");

  return duration.format("hh:mm:ss");
};

export const BuildStep = props => {
  const {step, goIntoStepFn, showOutputFn} = props;
  const infos = <div>
      <div className="stepName">{step.name}</div>
      <div className="stepDuration">{duration(step)}</div>
      </div>;
  const goIntoStepLink = <a className="goIntoStepLink" href="#" onClick={goIntoStepFn}>Substeps</a>;
  const showOutputLink = <a className="showOutputLink" href="#" onClick={showOutputFn}>Show Output</a>;
  const hasSubsteps = step.steps && step.steps.length !== 0;

  return <span className={Utils.classes("buildStep", step.state)}>
          {infos}
          {showOutputLink}
          <br/>&nbsp;
          {hasSubsteps ? goIntoStepLink : ""}
         </span>;
};

BuildStep.propTypes = {
  step: PropTypes.object.isRequired,
  goIntoStepFn: PropTypes.func.isRequired,
  showOutputFn: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    goIntoStepFn: () => dispatch(viewBuildStep(ownProps.buildId, ownProps.step.stepId)),
    showOutputFn: () => dispatch(showBuildOutput(ownProps.buildId, ownProps.step.stepId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildStep);
