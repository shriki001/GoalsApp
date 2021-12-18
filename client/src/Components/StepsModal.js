import React, { Component } from 'react';
import {
    Typography, Table, TableBody, TableCell, TableContainer, DialogActions,
    TableHead, TableRow, Paper, DialogContent, Grid, Dialog, DialogTitle, IconButton
} from '@material-ui/core';
import { FormControl } from "react-bootstrap";
import { Close } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Tooltip } from '../tools/Tooltip';

export default class StepsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInEditMode: false,
            isInAddingMode: false,
            editID: -1,
            steps: props.steps ? [...props.steps] : [],
            newStep: { name: '', description: '', dueDate: props.minDate }
        };
    }

    removeStep = id => {
        const { steps } = this.state;
        const newsteps = steps.filter((_, index) => index !== id);
        this.setState({ steps: newsteps });
    };

    handleChange = (e, index) => {
        const { steps } = this.state;
        steps[index] = { ...steps[index], [e.target.id]: e.target.value };
        this.setState({ steps });
    }

    handleChangeNewStep = e => {
        const { newStep } = this.state;
        this.setState({ newStep: { ...newStep, [e.target.id]: e.target.value } });
    }

    editStep = editID => this.setState({ isInEditMode: true, isInAddingMode: false, editID });

    stopEdit = id => {
        const propssteps = this.props.steps;
        const { steps } = this.state;
        if (propssteps && propssteps[id]) {
            steps[id] = propssteps[id];
        }
        this.setState({ isInEditMode: false, editID: -1, steps });
    }

    renderSteps() {
        const { isInEditMode, editID, steps } = this.state;
        return steps.map((step, index) => {
            const { name, description, dueDate } = step;
            return isInEditMode && editID === index ?
                <TableRow key={index}>
                    <TableCell align={'center'}>
                        <FormControl
                            value={name}
                            onChange={e => this.handleChange(e, index)}
                            id={'name'}
                        >
                        </FormControl>
                    </TableCell>
                    <TableCell align={'center'}>
                        <FormControl
                            value={description}
                            onChange={e => this.handleChange(e, index)}
                            id={'description'}
                        >
                        </FormControl>
                    </TableCell>
                    <TableCell align={'center'}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ zIndex: 2000 }}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    margin="normal"
                                    label={'Due Date'}
                                    value={dueDate}
                                    onChange={value => this.handleChange({ target: { id: 'dueDate', value } }, index)}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell align={'center'}>
                        <button className='btn btn-circle fa fa-save' title={'remove'}
                            onClick={_ => this.saveStep(index)} />
                        <button className='btn btn-circle fa fa-times' title={'remove'}
                            onClick={_ => this.stopEdit(index)} />
                    </TableCell>
                </TableRow> :
                <TableRow hover tabIndex={-1} key={index}>
                    <TableCell align={'center'}>{name}</TableCell>
                    <TableCell align={'center'}>{description}</TableCell>
                    <TableCell align={'center'}>{dueDate.toISOString().slice(0, 10)}</TableCell>
                    <TableCell align={'center'}>
                        <button className='btn btn-circle fa fa-edit' title={'edit step'}
                            onClick={_ => this.editStep(index)} />
                        <button className='btn btn-circle fa fa-trash' title={'remove step'}
                            onClick={_ => this.removeStep(index)} />
                    </TableCell>
                </TableRow>
        });
    }

    startAdding = _ => {
        this.setState({
            ...this.state,
            isInAddingMode: true,
            isInEditMode: false,
            editID: -1,
        }
        );
    };

    stopAdding = _ => this.setState({ isInAddingMode: false, newStep: { name: '', value: '' } });

    saveNewStep = _ => {
        const { newStep, steps } = this.state;
        this.setState({ steps: [...steps, newStep], tasksChanged: true }, _ => this.stopAdding());
    }

    saveStep = id => {
        this.setState({ isInEditMode: false, editID: -1 });
    };

    saveSteps = _ => {
        const { steps } = this.state;
        const { handleClose, ChangeSteps } = this.props;
        ChangeSteps(steps);
        handleClose();
    }

    render() {
        const { handleClose, minDate } = this.props;
        const { isInAddingMode, newStep } = this.state;
        return (
            <Dialog onClose={handleClose}
                open={true}>
                <DialogTitle onClose={handleClose}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ fontWeight: '500', color: 'black', alignSelf: 'center', margin: 'auto' }} variant="h5">Steps</Typography>
                        <IconButton
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 10px -4px', width: 52, height: 52, margin: '0px 0px 0px 15px', color: 'black' }}
                            onClick={_ => handleClose()}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <Paper>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={'center'}>Step Name</TableCell>
                                        <TableCell align={'center'}>Stpe Description</TableCell>
                                        <TableCell align={'center'}>Stpe Due Date</TableCell>
                                        <TableCell align={'center'}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isInAddingMode ?
                                        <TableRow>
                                            <TableCell align={'center'} style={{ minWidth: 150 }}>
                                                <FormControl
                                                    value={newStep['name']}
                                                    onChange={this.handleChangeNewStep}
                                                    id={'name'}
                                                >
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align={'center'} style={{ minWidth: 150 }} >
                                                <FormControl
                                                    value={newStep['description']}
                                                    onChange={this.handleChangeNewStep}
                                                    id={'description'}
                                                >
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align={'center'} style={{ minWidth: 250 }}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ zIndex: 2000 }}>
                                                    <Grid container justify="space-around">
                                                        <KeyboardDatePicker
                                                            margin="normal"
                                                            label={"Due Date"}
                                                            disablePast
                                                            minDate={minDate}
                                                            value={newStep['dueDate']}
                                                            onChange={value => this.handleChangeNewStep({ target: { id: 'dueDate', value } })}
                                                        />
                                                    </Grid>
                                                </MuiPickersUtilsProvider>
                                            </TableCell>
                                            <TableCell align={'center'} >
                                                <button className='btn btn-circle fa fa-check' title={'save'}
                                                    onClick={this.saveNewStep}>
                                                </button>
                                                <button className='btn btn-circle fa fa-times' title={'close'}
                                                    onClick={this.stopAdding}></button>
                                            </TableCell>
                                        </TableRow> : null}
                                    {this.renderSteps()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </DialogContent>
                <DialogActions style={{ margin: 'auto', justifyContent: 'space-between', width: '30%', display: 'flex' }}>
                    <Tooltip start={this.startAdding} title={'add'} />
                    <button
                        title={'save'}
                        className='btn btn-lg btn-circle btn-success fa fa-save'
                        onClick={this.saveSteps}>
                    </button>
                </DialogActions>
            </Dialog>
        )
    }
}
