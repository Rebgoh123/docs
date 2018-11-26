import React from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';

import CircleIcon from '@material-ui/icons/Lens';

import {helperActions} from "../../../actions/helper.actions";

import StepperNavigationPage from "./StepperNavigation";

class MaterialUiStepperPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active_step: this.props.active_step===undefined ? 0 : this.props.active_step ,
            titles:this.props.title,
            children: this.props.children,
            viewed: [],
            errors:[]
        };
    }

    componentDidMount() {

        console.log(this.props.children)
        var view;

        const {viewed, errors} = this.state;

        if(this.props.children.length>1){
            for(view in this.props.children){
                viewed[view] = this.props.children[view]['props']['visited'];
                errors[view] = false;
            }
        }else{
            viewed[0] = this.props.children['props']['visited'];
            errors[0] = false;
        }


        this.setState({
            viewed,errors
        });
    }

    static getDerivedStateFromProps(props, current_state) {
        //console.log(current_state.active_step  + " : " + JSON.stringify(props.active_step) + " RESULT " + (props.active_step === undefined) )
        const currentStep = props.active_step === undefined ? current_state.active_step : props.active_step;
        const {viewed,errors} = current_state;

        if (current_state.active_step !== props.active_step ) {
            viewed[currentStep] = true

            if( errors[currentStep] == true){
                errors[currentStep] = true
            }
            return {
                active_step:  currentStep,
                viewed
            }

        }else if (current_state.errors[current_state.active_step] !== props.error ){
            errors[currentStep] = props.error === undefined ? false : props.error

            return {
                errors
            }
        }
        // Return null to indicate no change to state.
        return null;
    }

    getSteps() {
        return this.state.titles;
    };

    handleStep = step => () => {
        this.setState({
            active_step: step,
        });
    };

    getStepContent(type) {
        var content = '';

        React.Children.map(this.state.children, (child,i) => {
            if (type === child.props.type) {
                content =
                    <TransitionGroup>
                        <CSSTransition
                            timeout={450}
                            classNames="fade"
                            key={i}
                            appear
                        >
                            {child}
                        </CSSTransition>
                    </TransitionGroup>
            }
        })
        return content
    }

    handleStep = step => () => {
        this.props.dispatch(helperActions.set_active_step(step));
    };

    render() {
        const steps = this.getSteps();
        const { active_step,viewed,errors } = this.state;

        return (
            <div className="div-stepper">

                <Stepper className='stepper' nonLinear activeStep={active_step}>
                    {steps.map((label, index) => {

                        const labelProps = {};
                        if (index == active_step ) {
                            if(errors[index]){
                                labelProps.className = "incorrect stepper-label-button";
                            }else{
                                labelProps.className = "inProgress stepper-label-button";
                            }

                        }else if(viewed[index]){
                            if(errors[index]){
                                labelProps.className = "incorrect stepper-label-button";
                            }else{
                                labelProps.className = "isViewed stepper-label-button";
                            }

                        }else{
                            labelProps.className = "stepper stepper-label-button";
                        }

                        return (

                            <StepButton {...labelProps}
                                        icon={<CircleIcon />}
                                        key={label}
                                        onClick={this.handleStep(index)}
                            >
                                <StepLabel className='step-label'> {label} </StepLabel>
                            </StepButton>
                        );
                    })}

                </Stepper>
                            <div className="div-slide">
                                <div className="div-form-container">
                                {this.state.active_step === steps.length ? (

                                    <div>

                                    <div style={{height:'400px'}}>
                                            <Typography >
                                                { 'New ' + this.props.component + ' created!'}
                                            </Typography>

                                        </div>
                                    <StepperNavigationPage/>
                                        </div>
                                ) : (
                                  <div>
                                {this.getStepContent(this.getSteps(active_step)[active_step],active_step)}
                                            </div>

                                    )}
                        </div>
                            </div>
                </div>

        );
    }
}

const mapStateToProps = state => ({
        title : state.helperReducer.helper_stepper_title.title,
        active_step : state.helperReducer.helper_stepper_active_step.active_step,
        error: state.helperReducer.helper_stepper_error.error,
    }

)

const MaterialUiStepper = connect(mapStateToProps)(MaterialUiStepperPage);

export default(MaterialUiStepper);