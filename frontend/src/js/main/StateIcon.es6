import React, {PropTypes} from "react";
import "../../sass/stateIcon.sass";

export const SUCCESS_ICON = "fa-check";
export const FAILURE_ICON = "fa-times";
export const RUNNING_ICON = "fa-cog rotate";
export const KILLED_ICON = "fa-ban";
export const DEFAULT_ICON = "fa-ellipsis-h";

export const StateIcon = ({state}) => {
    let iconClass;
    let hintText = "";
    switch (state) {
        case "success":
            iconClass = SUCCESS_ICON;
            hintText = "Success";
            break;
        case "failure":
        case "failed":
            iconClass = FAILURE_ICON;
            hintText = "Failure";
            break;
        case "running":
            iconClass = RUNNING_ICON;
            hintText = "Running";
            break;
        case "killed":
            iconClass = KILLED_ICON;
            hintText = "Killed";
            break;
        case "waiting":
            iconClass = DEFAULT_ICON;
            hintText = "Waiting";
            break;
        case "pending":
            iconClass = "";
            hintText = "Pending";
            break;
        default:
            iconClass = DEFAULT_ICON;
    }
    return <div title={hintText} className="buildIcon"><i className={"fa " + iconClass}/></div>;
};

StateIcon.propTypes = {
    state: PropTypes.string
};