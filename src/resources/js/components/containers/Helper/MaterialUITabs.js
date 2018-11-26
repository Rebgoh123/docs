import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export class MaterialUiTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };

    }

    handleChangeTab = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };


    render() {
        return (
            <div>
            <AppBar position="static" className="div-tab">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    {this.props.tab.map((value, index) => (
                        <Tab label={value} key={index} />
                    ))}
                </Tabs>
            </AppBar>

            <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
                {this.props.children}
             </SwipeableViews>

            </div>
        );
    }
}