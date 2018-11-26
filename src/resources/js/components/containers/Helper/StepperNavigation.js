import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {helperActions} from "../../../actions/helper.actions";

import Button from '@material-ui/core/Button';

import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import DoneIcon from '@material-ui/icons/Done';
import ResetIcon from '@material-ui/icons/refresh';
import ViewMoreIcon from '@material-ui/icons/removeredeye';

export class StepperNavigationPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active_step: this.props.active_step === undefined ? 0 : this.props.active_step,
            steps: this.props.title.length,
            visited: []
        };
    }

    componentWillMount(){
    this.addProductStep(this.state.active_step);

    }

    addProductStep = (steps) => {
        this.props.dispatch(helperActions.set_active_step(steps));
    };

    handleBack = () => {
        const { active_step } = this.state;

        this.setState(
            { active_step: active_step - 1 },
            () => this.addProductStep(this.state.active_step)
        );
    };

    handleReset = () => {
        this.props.dispatch(helperActions.set_active_step(0));
    };

    render() {
        const {active_step, steps} = this.state;
        return (
                <div className="stepper-button">


                    {this.props.type !=='update' ?
                        (
                            <div>
                    {active_step !== 0 && active_step !== steps ? (
                        <Button
                            className="inline stepper-back-button"
                            onClick={this.handleBack}
                            variant="fab"
                        >
                            <LeftIcon/>
                        </Button>) : <div/>
                    }

                    {active_step === steps ? (
                        <Button
                            className="inline stepper-reset-button"
                            onClick={this.handleReset}
                            variant="fab"
                        >
                            <ResetIcon />
                        </Button> ) :
                        (
                            active_step === steps - 1  ?

                        <Button variant="fab" className="inline stepper-done-button" type="submit">
                            <DoneIcon/>
                        </Button>
                          :
                        <Button variant="fab" className="inline stepper-next-button" type="submit">
                            <RightIcon />
                        </Button>
                        )
                    }
                        </div>
                        )
                        :
                        <Link to={"/" + this.props.component.toLowerCase() + '/' +  this.props.value.id}>
                            <Button variant="fab" className="inline stepper-done-button">
                                <ViewMoreIcon/>
                            </Button>
                        </Link>
                    }




                </div>
        );
    }
}

const mapStateToProps = state => ({
        title : state.helperReducer.helper_stepper_title.title,
        active_step : state.helperReducer.helper_stepper_active_step.active_step,
    }

)

const StepperNavigation = connect(mapStateToProps)(StepperNavigationPage);

export default (StepperNavigation);