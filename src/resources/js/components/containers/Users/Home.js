import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

    content: {
        zIndex: 2,
        background:'white',
        height:'100vh',
        width: '100vw',
        color:'black',
        fontSize:'20px',
        padding:'10px'

    },
});

class HomePage extends React.Component {
    render() {

        const { classes } = this.props;

        return (
            <div className={classes.content}>
                <Link to="/addcategory">add category</Link>
                <br/>
                <Link to="/addproduct">add product</Link>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
        // user: state.userReducer.authentication.initialState == undefined ? state.userReducer.authentication.user : state.userReducer.authentication.initialState.user,
    }
)

const connectedHomePage = connect(mapStateToProps)(withStyles(styles, { withTheme: true })(HomePage));
export { connectedHomePage as HomePage };