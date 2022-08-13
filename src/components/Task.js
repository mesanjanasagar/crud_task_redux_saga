import React from 'react'
import { Card, CardContent, Typography, Box, CardHeader, IconButton, TextField, Select, MenuItem, CardActions, Button, Avatar } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { deepOrange } from "@mui/material/colors";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useDispatch, useSelector } from "react-redux";
import * as UserActions from "../redux/actions";
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'

const Task = () => {
    const dispatch = useDispatch();
    const State = useSelector((state) => {
        return state;
    });

    const [value, setValue] = React.useState({
        task_msg: "",
        task_date: moment(new Date()).format('YYYY-MM-DD'),
        task_time: "",
        assigned_user: ""
    });
    let dropdownData = State.userDropdownData.isSuccess ?
        State.userDropdownData.results.data
        : [];

    const [isTaskOpen, setIsTaskOpen] = React.useState(false);
    const [isTaskEditOpen, setIsTaskEditOpen] = React.useState(false);
    const taskList = (State.allTasksData.isSuccess ? State.allTasksData.results : [])
    const onChangeHandler = (event, key) => {
        console.log("event.target", event.target.key, event.target.value)
        setValue({ ...value, [key]: event.target.value });
    };

    const deleteHandler = (task_id) => {
        console.log('delete')
        dispatch(UserActions.postDeleteTaskAction(company_id, token, task_id))
    };

    const editHandler = (item_id) => {
        console.log('edit')
        dispatch(UserActions.getSingleTaskAction(company_id, token, item_id));
        setIsTaskOpen(!isTaskOpen);
        setIsTaskEditOpen(!isTaskEditOpen);
    };
    // console.log('taskList', taskList)
    // console.log('isTaskOpen', isTaskOpen)
    // console.log('isTaskEditOpen', isTaskEditOpen)
    const submitHandler = () => {
        const hms = value.task_time;
        const [hours, minutes] = hms.split(':');
        const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60;
        let reqData = {
            ...value,
            task_time: totalSeconds,
            is_completed: 0,
            time_zone: new Date().getTimezoneOffset() * 60 * 1000
        }
        let task_id = State.singleTaskData.results.id
        isTaskEditOpen ? dispatch(UserActions.postUpdateTaskAction(reqData, company_id, token, task_id)) : dispatch(UserActions.postNewTaskAction(reqData, company_id, token));
        setIsTaskOpen(!isTaskOpen);
        setIsTaskEditOpen(!isTaskEditOpen);
    };

    React.useEffect(() => {
        dispatch(UserActions.getUserProfileAction({
            email: "smithwills1989@gmail.com",
            password: "12345678"
        }))
    }, []);

    React.useEffect(() => {
        dispatch(UserActions.getAllTaskAction(company_id, token))
    }, [State.userProfileData.isSuccess === true, State.deleteTaskData.isSuccess === true, State.updateTaskData.isSuccess === true, State.newTaskReducer.isSuccess === true]);

    React.useEffect(() => {
        if (State.singleTaskData.isSuccess) {
            const sec = parseInt(State.singleTaskData.results.task_time, 10); // convert value to number if it's string
            let hours = Math.floor(sec / 3600); // get hours
            let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
            if (hours < 10) { hours = "0" + hours; }
            if (minutes < 10) { minutes = "0" + minutes; }
            setValue({
                task_msg: State.singleTaskData.results.task_msg,
                task_date: State.singleTaskData.results.task_date,
                task_time: hours + ':' + minutes,
                assigned_user: State.singleTaskData.results.user_id
            })
        }
    }, [State.singleTaskData.isSuccess === true, isTaskEditOpen === true])

    let {
        token = '',
        company_id = ''
    } = State.userProfileData && State.userProfileData.isSuccess === true && State.userProfileData.results

    const OnAddHandler = () => {
        setIsTaskOpen(!isTaskOpen);
        setIsTaskEditOpen(false);
        setValue({ task_msg: "", task_date: "", task_time: "", assigned_user: "" });
    }
    return (
        <Card sx={{ minWidth: 275, maxWidth: 600 }} color={'green'} >
            <CardHeader
                action={
                    <IconButton aria-label="settings" onClick={() => OnAddHandler()}>
                        <AddOutlinedIcon />
                    </IconButton>
                }
                title="Tasks"
            />
            {isTaskOpen ?
                <><CardContent style={{ backgroundColor: '#bbdffb' }}>
                    <Typography sx={{ fontSize: 20, marginTop: '15px' }}
                        // color="text.secondary"
                        variant="h5"
                        gutterBottom>
                        Task Description
                    </Typography>
                    <TextField
                        // key='task_msg'
                        fullWidth
                        placeholder="Enter task description"
                        id="fullWidth"
                        style={{ backgroundColor: 'white' }}
                        onChange={(e) => onChangeHandler(e, 'task_msg')}
                        value={value.task_msg} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                        <Box>
                            <Typography
                                sx={{ fontSize: 20 }}
                                variant="h5"
                                gutterBottom
                            >
                                Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    disablePast
                                    // disableFuture
                                    label=""
                                    inputFormat='YYYY-MM-DD'
                                    // openTo="year"
                                    // views={['year', 'month', 'day']}
                                    value={value.task_date}
                                    onChange={(newValue) => {
                                        // onChangeHandler(newValue, 'task_date');
                                        // console.log('newValue--date', newValue)
                                        // console.log('newValue--date-moment', moment(newValue).format('YYYY-MM-DD'))
                                        setValue({ ...value, ['task_date']: moment(newValue).format('YYYY-MM-DD') });
                                    }}
                                    renderInput={(params) => <TextField {...params} style={{ backgroundColor: 'white' }} />
                                    }
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box>
                            <Typography
                                sx={{ fontSize: 20 }}
                                variant="h5"
                                gutterBottom
                            >
                                Time
                            </Typography>
                            <TextField
                                style={{ backgroundColor: 'white' }}
                                id="time"
                                label=""
                                type="time"
                                // defaultValue={value.time}
                                InputLabelProps={{
                                    // shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                sx={{ width: 300 }}
                                value={value.task_time}
                                onChange={(e) => onChangeHandler(e, 'task_time')}
                            />
                        </Box>
                    </Box>

                    <Typography sx={{ fontSize: 20, marginTop: '15px' }}
                        variant="h5"
                        gutterBottom>
                        Assign User
                    </Typography>
                    <Select
                        style={{ backgroundColor: 'white' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value.assigned_user}
                        label=""
                        onChange={(e) => onChangeHandler(e, 'assigned_user')}
                        fullWidth
                    >
                        {dropdownData.length && dropdownData.map((item, key) => {
                            return <MenuItem value={item.user_id} key={key}>{item.name}</MenuItem>
                        })}
                    </Select>
                </CardContent>
                    <CardActions style={{ diaplay: 'flex', backgroundColor: '#bbdffb', paddingRight: '20px', justifyContent: 'end' }}>
                        <Button size="small" onClick={() => {
                            return (setIsTaskOpen(false),
                                isTaskEditOpen && setIsTaskEditOpen(!isTaskEditOpen))
                        }}>Cancel</Button>
                        <Button size="small" variant="contained" color="success" onClick={(e) => { submitHandler(e) }}>Save</Button>
                    </CardActions>
                </> :
                taskList.length ?
                    taskList.map((item, index) => {
                        return <CardContent key={index}>
                            <Box style={{ display: 'flex', justifyContent: "space-between" }}>
                                <Box style={{ display: 'flex', }}>
                                    <Avatar sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }} variant="rounded">
                                        {/* <AssignmentIcon /> */}
                                    </Avatar>
                                    < Box style={{ marginLeft: '20px' }}>
                                        <Typography
                                            sx={{ fontSize: 16 }}
                                            variant="h4"
                                            gutterBottom>
                                            {item.task_msg}
                                        </Typography>
                                        <Typography
                                            sx={{ fontSize: 16 }}
                                            variant="h4"
                                            gutterBottom>
                                            {item.task_date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <CardActions style={{ diaplay: 'flex' }}>
                                    <IconButton aria-label="settings" onClick={() => editHandler(item.id)}>
                                        <ModeEditOutlineIcon />
                                    </IconButton>
                                    <IconButton aria-label="settings" onClick={() => deleteHandler(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    {/* <Button size="small">Cancel</Button> */}

                                </CardActions>
                            </Box>
                        </CardContent>
                    }) : null
            }


        </Card >
    )
}

export default Task