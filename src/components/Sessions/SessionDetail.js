import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";

import { SessionsContext } from "./SessionsProvider";

// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from '@material-ui/core/Fade';

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";

import PersonIcon from "@material-ui/icons/Person";
import EventIcon from "@material-ui/icons/Event";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import NotesIcon from "@material-ui/icons/Notes";
import NotificationsIcon from "@material-ui/icons/Notifications";

import {
  Grid,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  ButtonGroup,
} from "@material-ui/core";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  header: {
    display: "flex",
    alignContent: "center",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoArea: {
    display: "flex",
    alignItems: "center",
    margin: 15,
  },
  icon: {
    // padding: theme.spacing(2),
    textAlign: "center",
    border: "none",
    dropShadow: "none",
    // color: theme.palette.text.secondary,
  },
}));

const SessionDetail = ({ sessionId, ...props }) => {
  const { getSessionById } = useContext(SessionsContext);

  const [editMode, setEditMode] = useState(false);
  const [session, setSession] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);


  const handleChange = (e) => {
    setSession({
      ...session,
      [e.target.name]: e.target.value,
    });
  };


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {
    getSessionById(sessionId).then((res) => {
      setSession(res);
    });
  }, []);

  const toggleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  // const classes = useStyles();

  return (
    <div style={props.style} className={props.classes}>
      <form>
        <Card>
          <CardHeader
            avatar={
              <Avatar>
                {/* {session.clientName.charAt(0)}
                {session.clientName.charAt(session.clientName.indexOf(' ')+1)} */}
                <EventIcon />
              </Avatar>
            }
            action={
              <div className="buttonsGroup">
                <IconButton
                  aria-label="edit"
                  onClick={toggleEditMode}
                  style={
                    editMode ? { color: "blue", backgroundColor: "grey" } : {}
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="menu"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  disabled={editMode ? true : false}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem onClick={props.handleDuplicateSession}>Duplicate session</MenuItem>
                  <MenuItem onClick={handleMenuClose}>View client history</MenuItem>
                </Menu>
                <IconButton aria-label="cancel" onClick={props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            }
            // title={`${session.first_name} ${session.last_name}`}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <PersonIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="clientName"
                    onChange={handleChange}
                    value={session.clientName}
                  />
                ) : (
                  session.clientName
                )}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <EventIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="date"
                    onChange={handleChange}
                    value={session.date}
                  />
                ) : (
                  dayjs(session.date).format('dddd, MMMM D YYYY')
                )}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <>
                    <TextField
                      fullWidth
                      name="startTime"
                      onChange={handleChange}
                      value={session.startTime}
                    />
                    <TextField
                      fullWidth
                      name="endTime"
                      onChange={handleChange}
                      value={session.startTime}
                    />
                  </>
                ) : (
                  `${dayjs(session.startTime, 'H:mm').format('h:mma')} - ${dayjs(session.endTime, 'H:mm').format('h:mma')}`
                )}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <AttachMoneyIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode
                  ? "radio buttons here"
                  : session.isProBono
                  ? "Pro-bono"
                  : "Paid session"}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <NotesIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="notes"
                    onChange={handleChange}
                    value={session.notes}
                  />
                ) : (
                  session.notes
                )}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <NotificationsIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? "(notify settings here)" : "15 minutes before"}
              </Grid>
            </Grid>

            <CardActions style={{ justifyContent: "center", marginTop: 10 }}>
              {editMode ? (
                <>
                  <Button color="primary" variant="contained">
                    Save
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                ""
              )}
            </CardActions>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SessionDetail;
