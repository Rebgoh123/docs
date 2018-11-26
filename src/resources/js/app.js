require('./bootstrap');
import "@babel/polyfill";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import App from './components/index';
import GuestApp from './components/index_public'
import { store } from "./store";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ffffff',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#37474F',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
        // error: will use the default color
    },
    stepper: {
        iconColor: 'green' // or logic to change color
    },
    overrides: {
        MuiListItemText: {
            // Name of the rule
            root: {
                // Some CSS
                color: 'black',

            },
        },
    },

});


window.React = React
window.store = store

import  Add  from './components/containers/Form/Add'

if (document.getElementById('publicapp')) {

    render( <Provider store ={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GuestApp />
        </MuiThemeProvider>
    </Provider>, document.getElementById('publicapp'));

}
else {
    render(
        <Provider store ={store}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </MuiThemeProvider>
        </Provider>
        ,document.getElementById('app'));
}