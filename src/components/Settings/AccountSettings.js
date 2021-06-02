import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import { SettingsContext } from "./SettingsProvider";

// import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";

import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EventIcon from "@material-ui/icons/Event";
import NotesIcon from "@material-ui/icons/Notes";

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

const AccountSettings = ({ userId, ...props }) => {
  const { getAccountSettings, updateAccountSettings } = useContext(SettingsContext);

  const [editMode, setEditMode] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [accountSettings, setAccountSettings] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (e) => {
    setAccountSettings({
      ...accountSettings,
      [e.target.name]: e.target.value,
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    updateAccountSettings(accountSettings);
    setAccountSettings(accountSettings);
  };

  useEffect(() => {
    getAccountSettings().then((res) => {
      setAccountSettings(res);
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
                {accountSettings.firstName && accountSettings.firstName.charAt(0)}
                {accountSettings.lastName && accountSettings.lastName.charAt(0)}
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
                  <MenuItem onClick={props.openAddSessionWindow}>
                    Book session
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    View client history
                  </MenuItem>
                </Menu>
                <IconButton aria-label="cancel" onClick={props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            }
            // title={`${accountSettings.firstName} ${accountSettings.lastName}`}
            title={
              editMode ? (
                <>
                  <TextField
                    // fullWidth
                    helperText="First name"
                    name="first_name"
                    onChange={handleChange}
                    required
                    value={accountSettings.firstName}
                  />
                  {"  "}
                  <TextField
                    // fullWidth
                    helperText="Last name"
                    name="last_name"
                    onChange={handleChange}
                    required
                    value={accountSettings.lastName}
                  />
                </>
              ) : (
                `${accountSettings.firstName} ${accountSettings.lastName}`
              )
            }
            style={{ textAlign: "center" }}
            titleTypographyProps={{ variant: "h4" }}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <EmailIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="phone"
                    onChange={handleChange}
                    value={accountSettings.email}
                  />
                ) : (
                  accountSettings.email
                )}
              </Grid>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <EmailIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="email"
                    onChange={handleChange}
                    value={accountSettings.location}
                  />
                ) : (
                  accountSettings.location
                )}
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>

              

            <CardActions style={{ justifyContent: "center", marginTop: 10 }}>
              {editMode ? (
                deleteWarning ? (
                  <>
                    <Alert severity="error">
                      <strong>
                        Are you sure you want to delete your account?
                      </strong>
                    </Alert>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        // TODO: delete account
                        setDeleteWarning(false);
                        props.handleClose();
                      }}
                    >
                      Yes, delete my CoachTrackr account
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        setDeleteWarning(false);
                      }}
                    >
                      No, keep my account
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleUpdate}
                    >
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
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        setDeleteWarning(true);
                      }}
                    >
                      Delete Account
                    </Button>
                  </>
                )
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

export default AccountSettings;
