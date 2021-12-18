import React from 'react';
import MuiTooltip from '@material-ui/core/Tooltip';
import { IconButton, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styles = _ => ({
    tooltip: {
        fontSize: 17,
        whiteSpace: 'pre-line',
        marginTop: 5,
        textAlign: 'start'
    }
});

export const Tooltip = withStyles(styles)(props => {
    const { classes, title, start } = props;
    return (
        <MuiTooltip
            classes={classes}
            style={{ display: 'inline', fontSize: '50px; !important' }}
            title={title}
            placement="left-start">
            <IconButton onClick={start}
                style={{
                    color: 'white', margin: 20,
                    height: 50, width: 50, alignSelf: 'center',
                    background: '#0C79FA'
                }}  >
                <Add />
            </IconButton>
        </MuiTooltip>
    );
});