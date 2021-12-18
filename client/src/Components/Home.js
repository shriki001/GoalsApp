import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ChangeAuth } from '../store/actions/authAction';
import {
    Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination
} from '@material-ui/core';
import { Tooltip } from '../tools/Tooltip';
import { GetGoals } from '../store/actions/goalsAction'
import NewGoalModal from './NewGoalModal';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            newGoalModalOpen: false
        }
    }

    componentDidMount() {
        this.getGoals();
        this.props.ChangeAuth();
    }

    getGoals = _ => {
        const { page } = this.state;
        const { GetGoals } = this.props;
        GetGoals(page);
    }

    renderDetailPage = id => {
        const { history } = this.props;
        history.push(`/goals/${id}`);
        return <Redirect to={`/goals/${id}`} />
    }

    renderGoals = _ => {
        const { goals_ } = this.props;
        const { goals } = goals_;
        return goals && goals.map(goal => {
            const { _id, name, description, steps, complete, dueDate, updateAt } = goal;
            return <TableRow hover key={_id} tabIndex={-1} style={{ cursor: 'pointer' }} onClick={_ => this.renderDetailPage(_id)}>
                <TableCell align={'center'}>{name}</TableCell>
                <TableCell align={'center'}>{description}</TableCell>
                <TableCell align={'center'}>{steps.length}</TableCell>
                <TableCell align={'center'}>{JSON.stringify(complete)}</TableCell>
                <TableCell align={'center'}>
                    {new Date(dueDate).toISOString().slice(0, 10)}
                </TableCell>
                <TableCell align={'center'}>
                    {new Date(updateAt).toString().slice(0, 24)}
                </TableCell>
            </TableRow>
        });
    }

    handleChangePage = (_, page) => this.setState({ page }, _ => this.getGoals());

    render() {
        const { goals_ } = this.props;
        const { totalGoals, rowPerPage } = goals_;
        const { page, newGoalModalOpen } = this.state;
        return (
            <Paper>
                {newGoalModalOpen && <NewGoalModal handleClose={_ => this.setState({ newGoalModalOpen: false }, _ => this.getGoals())} />}
                <Typography variant="h1" style={{ textAlign: 'center', margin: '20px auto' }}>Goals</Typography>
                <Tooltip start={_ => this.setState({ newGoalModalOpen: true })} title={'Create new Goal'} />
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={totalGoals}
                    labelRowsPerPage={'Goals per page'}
                    rowsPerPage={rowPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                />
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'} style={{ minWidth: 100, verticalAlign: 'baseline' }}>Goal Name</TableCell>
                                <TableCell align={'center'} style={{ minWidth: 100, verticalAlign: 'baseline' }}>Goal Description</TableCell>
                                <TableCell align={'center'} style={{ minWidth: 100, verticalAlign: 'baseline' }}>Steps Count</TableCell>
                                <TableCell align={'center'} style={{ minWidth: 100, verticalAlign: 'baseline' }}>Complete</TableCell>
                                <TableCell align={'center'} style={{ minWidth: 100, verticalAlign: 'baseline' }}>Due Date</TableCell>
                                <TableCell
                                    align={'center'}
                                    style={{ minWidth: 148, verticalAlign: 'baseline' }}
                                >
                                    Last Updated
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderGoals()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        goals_: state.goals
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        GetGoals: (page) => dispatch(GetGoals(page)),
        ChangeAuth: () => dispatch(ChangeAuth())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);