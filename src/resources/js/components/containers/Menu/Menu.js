import React from 'react';
import APPCONFIG from  "../../../constants/config";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import history from '../../../routes/history'

import { DrawerNavigation } from './DrawerNavigation';
import {userActions} from "../../../actions/user.actions";

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const styles = theme => ({

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
        background: '#0D324D',
        color: 'white'

    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        height: '100vh',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
    },
});

class MenuAppBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            user:  JSON.parse(localStorage.getItem('user')),
        };
    }

    static getDerivedStateFromProps(props, current_state) {
        // console.log(current_state.user  + " : " + JSON.stringify(props.user) + " RESULT " +   (!!(props.user)?true:false))
        if (current_state.user !== props.user) {

            return {
                user: (!!(props.user)?props.user:false),

            }
        }
        // Return null to indicate no change to state.
        return null;
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleLogout = () => {
        //
        // localStorage.setItem('user', false);
        // location.reload();
        // history.push('/login');

        const {dispatch} = this.props;
        dispatch(userActions.logout(this.state.user))
    };

    render() {

        const { classes, theme } = this.props;
        const { user } = this.state;

        const drawer = (
            <div>
            <List>
            {DrawerNavigation}
            </List>
            </div>
    );

        return (
        <div>
        <AppBar
        position="absolute"
        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
    >
    <Toolbar disableGutters={!this.state.open}>
    <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={this.handleDrawerOpen}
        className={classNames(classes.menuButton, this.state.open && classes.hide)}
    >
    <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap style={{flexGrow: '1'}}>
        {APPCONFIG.company}
    </Typography>
        {/*<Button color="inherit" onClick={this.handleLogout}>Logout</Button>*/}
        </Toolbar>
        </AppBar>
        <Drawer
        variant="permanent"
        classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
        }}
        open={this.state.open}
    >
    <div className={classes.toolbar}>
    <IconButton onClick={this.handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRightIcon /> :  <ChevronLeftIcon /> }
    </IconButton>
        </div>
        <Divider />
        {drawer}
        </Drawer>
        </div>

    );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    // user: state.userReducer.authentication.initialState == undefined ?
    //     (state.userReducer.authentication.loggingIn == true ? false : state.userReducer.authentication.user): state.userReducer.authentication.initialState.user,
})


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(MenuAppBar));