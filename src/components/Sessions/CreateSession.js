import React, { useState, useEffect, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import dayjs from "dayjs";
import DayJsUtils from "@date-io/dayjs";

// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
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
  MenuItem,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const CreateSession = ({ sessionId, ...props }) => {
  const { allClients } = useContext(ClientsContext);

  const [session, setSession] = useState({
    clientId: props.clientId || 0,
    date: props.date || dayjs(new Date()).format("MM/DD/YYYY"),
    startTime: props.startTime || dayjs(new Date()).hour(8).minute(0),
    endTime: props.endTime || "",
    isProBono: props.isProBono || false,
    notes: props.notes || "",
    notifications: props.notifications || [],
  });

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
    setSession({
      ...session,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateTimeChange = (value, key) => {
    const sessionInfo = { ...session };
    sessionInfo[key] = value;
    setSession(sessionInfo);
    console.log(value)
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
                <TextField
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
                </TextField>
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
                    format="MM/DD/YYYY"
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={10}>
                {/* <TextField
                  fullWidth
                  name="startTime"
                  onChange={handleChange}
                  value={session.startTime}
                  label={"Start Time"}
                /> */}
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                  <KeyboardTimePicker
                    // label="Masked timepicker"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    value={session.startTime}
                    onChange={(time) => handleDateTimeChange(time, "startTime")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <HourglassFullIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="endTime"
                  onChange={handleChange}
                  value={session.endTime}
                  label={"Duration"}
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
                <Button color="primary" variant="contained">
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
