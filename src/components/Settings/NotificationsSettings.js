import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import { SettingsContext } from "./SettingsProvider";

import SettingsSidebar from "../Settings/SettingsSidebar";

// import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Collapse from "@material-ui/core/Collapse";

import {
  Grid,
  makeStyles,
  CardActions,
  TextField,
  Button,
  Checkbox,
  Typography,
} from "@material-ui/core";

import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   header: {
//     display: "flex",
//     alignContent: "center",
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   infoArea: {
//     display: "flex",
//     alignItems: "center",
//     margin: 15,
//   },
//   icon: {
//     // padding: theme.spacing(2),
//     textAlign: "center",
//     border: "none",
//     dropShadow: "none",
//     // color: theme.palette.text.secondary,
//   },
// }));

const NotificationSettings = ({ userId, ...props }) => {
  const { getNotificationSettings, updateNotificationSettings, bookmark } =
    useContext(SettingsContext);

  const [notificationSettings, setNotificationSettings] = useState({
    sessionReminderHoursBefore: 0,
    clientMilestonesMonth: false,
    clientMilestonesYear: false,
    topClient: false,
    certificationRequirements: {
      frequencyInWeeks: 2,
      dayOfWeek: 1,
    },
    certificationAccomplishments: {
      anything: false,
      clienteleIncrease: false,
      hoursIncrease: false,
    },
  });

  const classes = useStyles();

  const history = useHistory();

  const handleChange = (e) => {
    setNotificationSettings({
      ...notificationSettings,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getNotificationSettings().then((res) => {
      setNotificationSettings(res);
    });
  }, []);

  // const classes = useStyles();

  return (
    <>
      <SettingsSidebar backButtonDest={bookmark} />
      <div className="main-content">
        <div className="settings">
          {/* <h2>Account</h2> */}
          <div style={props.style} className={props.classes}>
            {/* <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      notificationSettings.sessionReminderHoursBefore === 0
                    }
                    onChange={handleChange}
                    name="sessionReminders"
                  />
                }
                label="Session Reminders"
              />
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      (notificationSettings.notifications &&
                        notificationSettings.clientMilestonesMonth) ||
                      notificationSettings.clientMilestonesYear
                    }
                    onChange={handleChange}
                    name="clientMilestones"
                  />
                }
                label="Client Milestones"
              />
            </Box> */}

            {/* <Grid item > */}
            {/* <Typography variant="h4">Notification Settings</Typography> */}
            <h2>Notifications Settings</h2>
            <div className="settings-chunk">
              <List>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          notificationSettings.sessionReminderHoursBefore === 0
                        }
                        onChange={handleChange}
                        name="sessionReminders"
                      />
                    }
                    label="Session Reminders"
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  <div>
                    Notify me
                    <TextField size="small" />
                    <FormControl className={classes.formControl}>
                      <Select
                        id="reminder-unit"
                        value={1}
                        onChange={handleChange}
                      >
                        <MenuItem value={60}>Hour(s)</MenuItem>
                        <MenuItem value={1}>Minute(s)</MenuItem>
                      </Select>
                    </FormControl>
                    prior to sessions
                  </div>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          notificationSettings.clientMilestonesMonth ||
                          notificationSettings.clientMilestonesYear
                        }
                        onChange={handleChange}
                        name="clientMilestones"
                      />
                    }
                    label="Client Milestones"
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  Notify me when clients reach:
                </ListItem>
                <ListItem className={classes.nested}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.clientMilestonesMonth}
                        onChange={handleChange}
                        name="clientMilestonesMonth"
                      />
                    }
                    label="their one month anniversary"
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.clientMilestonesYear}
                        onChange={handleChange}
                        name="clientMilestonesYear"
                      />
                    }
                    label="their annual anniversary"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.topClient}
                        onChange={handleChange}
                        name="topClient"
                      />
                    }
                    label="Notify me when I have a new top client"
                  />
                </ListItem>
                <ListItem>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.topClient}
                        onChange={handleChange}
                        name="certificationTrack"
                      />
                    }
                    label="Certification Track"
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  Notify me about my remaining requirements:
                </ListItem>
                <ListItem className={classes.nested}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.certificationRequirements.frequencyInWeeks > 0}
                        onChange={handleChange}
                        name="certificationTrack"
                      />
                    }
                    label={
                      <>
                        Every
                        
                        <FormControl className={classes.formControl}>
                          <Select
                            id="reminder-unit"
                            value={notificationSettings.certificationRequirements.frequencyInWeeks}
                            onChange={handleChange}
                          >
                            <MenuItem value={1}>week</MenuItem>
                            <MenuItem value={2}>2 weeks</MenuItem>
                            <MenuItem value={3}>3 weeks</MenuItem>
                            <MenuItem value={4}>4 weeks</MenuItem>
                          </Select>
                        </FormControl>
                        on
                        <FormControl className={classes.formControl}>
                          <Select
                            id="reminder-unit"
                            value={1}
                            onChange={handleChange}
                          >
                            <MenuItem value={0}>Sundays</MenuItem>
                            <MenuItem value={1}>Mondays</MenuItem>
                            <MenuItem value={2}>Tuesdays</MenuItem>
                            <MenuItem value={3}>Wednesdays</MenuItem>
                            <MenuItem value={4}>Thursdays</MenuItem>
                            <MenuItem value={5}>Fridays</MenuItem>
                            <MenuItem value={6}>Saturdays</MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    }
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  Notify me about my accomplishments:
                </ListItem>
                <ListItem className={classes.nested}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.certificationAccomplishments.anything}
                        onChange={handleChange}
                        name="certificationTrack"
                      />
                    }
                    label="every time I accumulate anything toward my goal"
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.certificationAccomplishments.clienteleIncrease}
                        onChange={handleChange}
                        name="certificationTrack"
                      />
                    }
                    label="every time I increase my client base"
                  />
                </ListItem>
                <ListItem className={classes.nested}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={notificationSettings.certificationAccomplishments.hoursIncrease}
                        onChange={handleChange}
                        name="certificationTrack"
                      />
                    }
                    label="every time I increase my accumulated hours"
                  />
                </ListItem>
              </List>
            </div>
            {/* </Grid> */}

            {/* </Grid> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationSettings;
