import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import { ClientsContext } from "./ClientsProvider";

// import Box from "@material-ui/core/Box";

import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from '@material-ui/core/Fade';

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

const ClientDetail = ({ clientId, ...props }) => {
  const { getClientById, updateClient, removeClient } = useContext(
    ClientsContext
  );

  const [editMode, setEditMode] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [client, setClient] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (e) => {
    setClient({
      ...client,
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
    updateClient(client);
    setClient({});
  };

  useEffect(() => {
    getClientById(clientId).then((res) => {
      setClient(res);
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
                {client.first_name && client.first_name.charAt(0)}
                {client.last_name && client.last_name.charAt(0)}
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
                  <MenuItem onClick={props.openAddSessionWindow}>Book session</MenuItem>
                  <MenuItem onClick={handleMenuClose}>View client history</MenuItem>
                </Menu>
                <IconButton aria-label="cancel" onClick={props.handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
            }
            // title={`${client.first_name} ${client.last_name}`}
            title={
              editMode ? (
                <>
                  <TextField
                    // fullWidth
                    helperText="First name"
                    name="first_name"
                    onChange={handleChange}
                    required
                    value={client.first_name}
                  />
                  {"  "}
                  <TextField
                    // fullWidth
                    helperText="Last name"
                    name="last_name"
                    onChange={handleChange}
                    required
                    value={client.last_name}
                  />
                </>
              ) : (
                `${client.first_name} ${client.last_name}`
              )
            }
            style={{ textAlign: "center" }}
            titleTypographyProps={{ variant: "h4" }}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={1}></Grid>

              <Grid item xs={"auto"}>
                <PhoneIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="phone"
                    onChange={handleChange}
                    value={client.phone}
                  />
                ) : (
                  client.phone
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
                    value={client.email}
                  />
                ) : (
                  client.email
                )}
              </Grid>
              <Grid item xs={1}></Grid>

              {editMode ? (
                ""
              ) : (
                <>
                  <Grid item xs={"auto"}>
                    <AttachMoneyIcon />
                  </Grid>
                  <Grid item xs={10}>
                    5 unused paid sessions
                  </Grid>
                  <Grid item xs={1}></Grid>

                  <Grid item xs={"auto"}>
                    <EventIcon />
                  </Grid>
                  <Grid item xs={10}>
                    {client.upcomingSessions
                      ? client.upcomingSessions.length
                      : "No"}{" "}
                    upcoming sessions
                    {client.upcomingSessions ? (
                      <Typography variant={"subtitle2"}>
                        {client.upcomingSessions
                          .slice(0, 3)
                          .map((session, index, array) => {
                            return `${session.date}${
                              index === array.length - 1
                                ? client.upcomingSessions.length > 3
                                  ? "..."
                                  : ""
                                : ", "
                            } `;
                          })}
                      </Typography>
                    ) : (
                      "No"
                    )}
                  </Grid>
                  <Grid item xs={1}></Grid>
                </>
              )}

              <Grid item xs={"auto"}>
                <NotesIcon />
              </Grid>
              <Grid item xs={10}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="notes"
                    onChange={handleChange}
                    value={client.notes}
                  />
                ) : (
                  client.notes
                )}
              </Grid>
            </Grid>

            <CardActions style={{ justifyContent: "center", marginTop: 10 }}>
              {editMode ? (
                deleteWarning ? (
                  <>
                    <Alert severity="error">
                      <strong>
                        Are you sure you want to delete {client.first_name}{" "}
                        {client.last_name} as a client?
                      </strong>
                    </Alert>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        removeClient(clientId);
                        setDeleteWarning(false);
                        props.handleClose();
                      }}
                    >
                      Yes, delete {client.first_name}
                    </Button>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={() => {
                        setDeleteWarning(false);
                      }}
                    >
                      No, Cancel
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
                      Delete Client
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

export default ClientDetail;
