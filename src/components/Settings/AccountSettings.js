import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { makeStyles } from "@material-ui/core/styles";

import { SettingsContext } from "./SettingsProvider";

import SettingsSidebar from "../Settings/SettingsSidebar";

// import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";


import {
  Grid,
  makeStyles,
  CardActions,
  TextField,
  Button,
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
  const { getAccountSettings, updateAccountSettings } =
    useContext(SettingsContext);

  const [editMode, setEditMode] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [accountSettings, setAccountSettings] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

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
    <>
      <SettingsSidebar />
      <div className="main-content">
        <div className="settings">
          <h2>Account</h2>
          <div style={props.style} className={props.classes}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={1}></Grid>

                <Grid item xs={3}>
                  Name
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    name="name"
                    onChange={handleChange}
                    value={accountSettings.name}
                  />
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                  Email
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    name="email"
                    onChange={handleChange}
                    value={accountSettings.email}
                  />
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                  Location
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    name="location"
                    onChange={handleChange}
                    value={accountSettings.location}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>

              <CardActions style={{ justifyContent: "center", marginTop: 10 }}>
                {deleteWarning ? (
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
                        history.push("/settings")
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
                        history.push("/settings");
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </CardActions>
              {deleteWarning ? (
                ""
              ) : (
                <>
                  <Button color="secondary">Manage Subscription </Button>
                  <Button color="secondary">Change Password</Button>
                  <Button
                    color="secondary"
                    onClick={() => {
                      setDeleteWarning(true);
                    }}
                  >
                    Delete Account
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
