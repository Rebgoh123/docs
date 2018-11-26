import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import  history  from "../routes/history";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import routes from "../routes/routes";
import Menu  from './containers/Menu/PublicMenu'
import '../css/style.css'
import APPCONFIG from  "../constants/config";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        zIndex: 0,
        height:'100vh'
    },
});

class GuestApp extends React.Component {

    render() {

        const { classes, theme } = this.props;

        return (

            <Router history={history}>
                <div className={classes.root}>
                    <Menu/>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {routes}
                    </main>

                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange={false}
                        draggable
                        pauseOnHover
                    />
                </div>
            </Router>
        );
    }
}

GuestApp.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    // user: state.userReducer.authentication.loggingOut == true ? true : state.userReducer.authentication.user,
})

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(GuestApp));