import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";

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

import {
  Grid,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

const CreateSession = ({ sessionId, ...props }) => {
  const [session, setSession] = useState({
    clientId: 0,
    date: "",
    startTime: "",
    endTime: "",
    isProBono: false,
    notes: "",
    notifications: [],
  });

  const handleChange = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.value,
    });
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
                  onChange={handleChange}
                  value={session.clientId}
                  label={"Client"}
                  required
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <EventIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="date"
                  onChange={handleChange}
                  value={session.date}
                  label={"Date"}
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="startTime"
                  onChange={handleChange}
                  value={session.startTime}
                  label={"Start Time"}
                />
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
                  onClick={props.cancel}
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
