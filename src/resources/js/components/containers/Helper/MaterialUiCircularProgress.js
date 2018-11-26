import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

export class MaterialUiCircularProgress extends React.Component {

    render() {
        return (
            <div className="progress-style">
                <CircularProgress color="secondary"/>
            </div>
        );
    }
}