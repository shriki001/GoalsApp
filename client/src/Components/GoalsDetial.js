import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography, List, ListItem, Divider, ListItemText } from '@material-ui/core';
import { Redirect } from 'react-router';

class GoalsDetial extends Component {
    render() {
        const { goals_, history } = this.props;
        const { goals } = goals_;
        const id = history.location.pathname.split('/').pop();
        const currGoal = goals.find(g => g._id === id);
        if (currGoal) {
            const { steps } = currGoal;
            return (
                <>
                    <Typography variant="h1" style={{ textAlign: 'center', margin: '20px auto' }}>Goals Detail</Typography>
                    <List>
                        {steps.map(s => {
                            const { _id, name, description, complete } = s;
                            return <>
                                <ListItem ket={_id} alignItems="center"
                                    style={{
                                        textAlign: 'center', opacity: complete ? 0.5 : 1,
                                        textDecorationLine: complete ? 'line-through' : 'unset'
                                    }}>
                                    <ListItemText
                                        primary={name}
                                        secondary={
                                            <React.Fragment>
                                                {description}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>
                        })}
                    </List>
                </>
            )
        }
        else {
            history.push(`/`);
            return <Redirect to={`/`} />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        goals_: state.goals
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GoalsDetial);