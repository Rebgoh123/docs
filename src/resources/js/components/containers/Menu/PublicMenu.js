import React from 'react';
import APPCONFIG from  "../../../constants/config";
import { connect } from 'react-redux'

import { DrawerNavigation } from './DrawerNavigation';
import {userActions} from "../../../actions/user.actions";

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

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

class PublicMenuAppBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
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
                    <Toolbar >
                        <Typography variant="title" color="inherit" >
                            {APPCONFIG.company}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            // )}

        );
    }
}

PublicMenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
})


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(PublicMenuAppBar));