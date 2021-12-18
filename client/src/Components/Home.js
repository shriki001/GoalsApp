import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, TablePagination
} from '@material-ui/core';
import { GetGoals } from '../store/actions/goalsAction'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 0
        }
    }

    componentDidMount() {
        const { GetGoals } = this.props;
        GetGoals();
    }

    renderDetailPage = id => {
        const { history } = this.props;
        history.push(`/${id}`);
        return <Redirect to={`/${id}`} />
    }

    renderGoals = _ => {
        const { goals_ } = this.props;
        const { goals } = goals_;
        console.log(goals_)
        return goals && goals.map(goal => {
            const { _id, name, description, steps, complete, updateAt } = goal;
            return <TableRow hover key={_id} tabIndex={-1} style={{ cursor: 'pointer' }} onClick={_ => this.renderDetailPage(_id)}>
                <TableCell align={'center'}>{name}</TableCell>
                <TableCell align={'center'}>{description}</TableCell>
                <TableCell align={'center'}>{steps.length}</TableCell>
                <TableCell align={'center'}>{JSON.stringify(complete)}</TableCell>
                <TableCell align={'center'}>
                    {new Date(updateAt).toString().slice(0, 24)}
                </TableCell>
            </TableRow>
        });
    }

    handleChangePage = _ => {

    }

    render() {
        const { goals_ } = this.props;
        const { totalGoals } = goals_;
        const { page, pageSize } = this.state;
        return (
            <Paper>
                <Typography variant="h1" style={{ textAlign: 'center', margin: '20px auto' }}>Goals</Typography>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={totalGoals}
                    labelRowsPerPage={'Goals per page'}
                    rowsPerPage={pageSize}
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
        GetGoals: () => dispatch(GetGoals())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);