import React from 'react';
import { connect } from 'react-redux';

import {helperActions} from "../../../actions/helper.actions";
import {handleActiveStep} from "./HandleActiveStep";

import Button from '@material-ui/core/Button';

import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';

export class StepperNavigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active_step: this.props.active_step === undefined ? 0 : this.props.active_step,
            steps: this.props.title.length,
        };
    }


    componentWillMount(){
        handleActiveStep(this.state.active_step);
    }

    render() {
        const {active_step, steps} = this.state;
        return (
            <div className="stepper-button">
                {active_step !== 0 ? (
                    <Button
                        className="stepper-back-button"
                        onClick={handleActiveStep('back')}
                        variant="fab"
                    >
                        <LeftIcon />
                    </Button> ) : (<div/>) }

                <Button variant="fab" className="stepper-next-button" type="submit">
                    {active_step === steps.length - 1 ? 'Finish' :  <RightIcon />}

                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        title : state.helperReducer.helper_stepper_title.title,
        active_step : state.helperReducer.helper_stepper_active_step.active_step,
    }

)

const StepperNavigationPage = connect(mapStateToProps)(StepperNavigation);

export default (StepperNavigationPage);