import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import { ClientsContext } from "./ClientsProvider";

// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

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

const CreateClient = ({ clientId, ...props }) => {
  const { getClientById } = useContext(ClientsContext);

  const [editMode, setEditMode] = useState(false);
  const [client, setClient] = useState({})

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    getClientById(clientId)
      .then((res) => {setClient(res)})
  }, [])

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
                  disabled={editMode ? true : false}
                >
                  <MoreVertIcon />
                </IconButton>
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
                        {client.upcomingSessions.map((session) => {
                          return `${session.date}, `;
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

export default CreateClient;
