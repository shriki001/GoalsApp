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
                            const { _id, name, description, completed, dueDate } = s;
                            return <div key={_id}>
                                <ListItem alignItems="center"
                                    style={{
                                        textAlign: 'center', opacity: completed ? 0.5 : 1,
                                        textDecorationLine: completed ? 'line-through' : 'unset'
                                    }}>
                                    <ListItemText
                                        primary={name}
                                    />
                                    <ListItemText

                                        secondary={
                                            <React.Fragment>
                                                {description}
                                            </React.Fragment>
                                        }
                                    />
                                    <ListItemText
                                        primary={new Date(dueDate).toISOString().slice(0, 10)}
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
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