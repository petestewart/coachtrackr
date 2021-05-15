import React, { useState, useEffect, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import dayjs from "dayjs";
import DayJsUtils from "@date-io/dayjs";

// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
// import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import NotesIcon from "@material-ui/icons/Notes";
import NotificationsIcon from "@material-ui/icons/Notifications";

import { ClientsContext } from "../Clients/ClientsProvider";

import {
  Grid,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  // MenuItem,
  TextField,
  Button,
  FormControlLabel,
  // RadioGroup,
  // Radio,
} from "@material-ui/core";

import {
  KeyboardDatePicker,
  // KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const CreateSession = ({ sessionId, ...props }) => {
  const { allClients } = useContext(ClientsContext);

  const [session, setSession] = useState({
    clientId: props.clientId || 0,
    date: props.date || dayjs(new Date()).format("MM/DD/YYYY"),
    startTime: props.startTime || "08:00",
    endTime: props.endTime || "09:00",
    isProBono: props.isProBono || false,
    notes: props.notes || "",
    notifications: props.notifications || [],
  });

  // const timeOptions = [...Array(24 * 4)].map((item, index) =>
  //   dayjs()
  //     .startOf("d")
  //     .add(15 * index, "minute")
  //     .format("h:mm a")
  // );

  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    if (allClients) {
      setClientList(
        allClients
          .map((client) => {
            return {
              id: client.id,
              name: `${client.first_name} ${client.last_name}`,
            };
          })
          .sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            return -1;
          })
      );
    }
  }, [allClients]);

  const handleChange = (e) => {
    // if (e.target.name === "startTime" && session.endTime < e.target.value) {
    //   session.endTime = e.target.value
    // }
    // if (e.target.name === "endTime" && session.endTime < e.target.value) {
    //   session.startTime = e.target.value
    // }
    setSession({
      ...session,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateTimeChange = (value, key) => {
    const sessionInfo = { ...session };
    sessionInfo[key] = value;
    setSession(sessionInfo);
    console.log(value);
  };

  const handleChecked = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.checked,
    });
  };

  const handleRadio = (e) => {
    console.log(e.target.value);
    setSession({
      ...session,
      [e.target.name]: e.target.value === "true",
    });
  };

  // const classes = useStyles();

  return (
    <div style={props.style} className={props.classes}>
      <form>
        <Card>
          <CardHeader
            avatar={
              session.first_name && session.last_name ? (
                <Avatar>
                  {session.first_name && session.first_name.charAt(0)}
                  {session.last_name && session.last_name.charAt(0)}
                </Avatar>
              ) : (
                ""
              )
            }
            action={
              <IconButton aria-label="cancel" onClick={props.handleClose}>
                <CloseIcon />
              </IconButton>
            }
            // title={`${session.first_name} ${session.last_name}`}
            title={"Add New Session"}
            style={{ textAlign: "center" }}
            titleTypographyProps={{ variant: "h4" }}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <PersonIcon />
              </Grid>
              <Grid item xs={10}>
                {/* <TextField
                  fullWidth
                  name="clientId"
                  select
                  onChange={handleChange}
                  value={session.clientId}
                  label={"Client"}
                  required
                >
                  {clientList.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.name}
                    </MenuItem>
                  ))}
                </TextField> */}
                <Autocomplete
                  name="clientId"
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSession({ ...session, clientId: newValue.id });
                    }
                  }}
                  options={clientList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Client name" />
                  )}
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <EventIcon />
              </Grid>
              <Grid item xs={10}>
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                  <KeyboardDatePicker
                    clearable
                    value={session.date}
                    placeholder={dayjs(new Date()).format("MM/DD/YYYY")}
                    onChange={(date) => handleDateTimeChange(date, "date")}
                    format="ddd, MMMM D YYYY"
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={5}>
                {/* <TextField
                  // fullWidth
                  label={"start"}
                  name="startTime"
                  onChange={handleChange}
                  value={session.startTime}
                /> */}
                <TextField
                  error={session.endTime <= session.startTime}
                  name="startTime"
                  label="Start Time"
                  type="time"
                  // defaultValue="08:00"
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 900, // 15 min
                  }}
                  value={session.startTime}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  error={session.endTime <= session.startTime}
                  helperText={
                    session.endTime <= session.startTime
                      ? "must be later than start time"
                      : ""
                  }
                  name="endTime"
                  label="End Time"
                  type="time"
                  // defaultValue="09:00"
                  // className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 900, // 15 min
                  }}
                  value={session.endTime}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <AttachMoneyIcon />
              </Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={session.isProBono}
                      onChange={handleChecked}
                      name="isProBono"
                    />
                  }
                  label="Pro bono"
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <NotesIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="notes"
                  onChange={handleChange}
                  value={session.notes}
                  label={"Notes"}
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <NotificationsIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="notifications"
                  onChange={handleChange}
                  value={session.notifications}
                  label={"Add Notification"}
                />
              </Grid>
            </Grid>

            <CardActions style={{ justifyContent: "center", marginTop: 10 }}>
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => props.handleAddSession(session)}
                  disabled={session.endTime <= session.startTime}
                >
                  Save
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </>
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateSession;
