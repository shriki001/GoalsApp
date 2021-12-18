import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as Yup from "yup";
import { DialogContent, IconButton, Grid, Divider, Dialog, DialogTitle, Typography } from '@material-ui/core';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormik } from "formik";
import { CreateGoal } from '../store/actions/goalsAction';
import { Edit, Add, Close } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import StepsModal from './StepsModal';

function NewGoalModal({ handleClose, CreateGoal }) {
    const [stepsModal, setOpenStepsModal] = useState(false);
    const fields = {
        name: 'Name', description: 'Description'
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            steps: [],
            dueDate: new Date()
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, "Mininum 3 characters").required("*Required"),
            dueDate: Yup.date().required("*Required")
        }),
        onSubmit: values => {
            CreateGoal(values);
            handleClose();
        }
    });

    function ChangeSteps(steps) {
        formik.setFieldValue('steps', steps);
    }

    function renderModal() {
        return (
            <form onSubmit={formik.handleSubmit}>
                {['name', 'description'].map(id =>
                    <FormGroup controlId={id} key={id}>
                        <Grid container justify="center" alignItems="center" >
                            <Grid item xs={6}>
                                <ControlLabel>{fields[id]}</ControlLabel>
                            </Grid>
                            <Grid item xs={6} style={{ textAlign: 'center' }}>
                                <FormControl
                                    onBlur={formik.handleBlur}
                                    type={"text"}
                                    autoComplete="off"
                                    value={formik['values'][id]}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors[id] && formik.touched[id] && (
                                    <p style={{ color: 'red' }}>{formik.errors[id]}</p>
                                )}
                            </Grid>
                        </Grid>
                    </FormGroup>
                )}
                <Divider style={{ marginBottom: 20 }} />
                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ zIndex: 2000 }}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            label={'Due Date'}
                            value={formik.values['dueDate']}
                            disablePast
                            onChange={time => {
                                debugger
                                // changeAbsDate(item, time)
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Typography variant="h6" style={{ textAlign: 'center', margin: 'auto' }}>Steps</Typography>
                    <IconButton onClick={_ => setOpenStepsModal(true)} style={{ margin: 'auto', display: 'block', backgroundColor: '#0C79FA', color: 'white' }}>
                        {formik['values']['steps'] && formik['values']['steps'].length ? <Edit /> : <Add />}
                    </IconButton>
                </div>
                <Divider style={{ margin: '20px 0' }} />
                <Button className={'btn btn-primary'} style={{ borderRadius: 25, padding: '5px 30px', margin: '30px auto 0', display: 'block' }}
                    type="submit">{'Submit'}</Button>
            </form>
        )
    }

    return (
        <>
            {stepsModal && <StepsModal ChangeSteps={steps => ChangeSteps(steps)}
                handleClose={_ => setOpenStepsModal(false)} steps={formik['values']['steps']} />}
            <Dialog
                open={true}>
                <DialogTitle onClose={_ => handleClose()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography style={{ fontWeight: '500', color: 'black', alignSelf: 'center', margin: 'auto' }} variant="h5">Create new Goal</Typography>
                        <IconButton
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 10px -4px', width: 52, height: 52, margin: '0px 0px 0px 15px', color: 'black' }}
                            onClick={_ => handleClose()}>
                            <Close />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {renderModal()}
                </DialogContent>
            </Dialog>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        CreateGoal: (payload) => dispatch(CreateGoal(payload))
    }
};

export default connect(null, mapDispatchToProps)(NewGoalModal);