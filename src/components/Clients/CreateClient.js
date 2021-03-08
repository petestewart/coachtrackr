import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";

// import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import NotesIcon from "@material-ui/icons/Notes";

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


const CreateClient = ({ clientId, ...props }) => {
  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    isCurrent: true,
    isGroup: false
  });

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.checked,
    });
  };

  const handleRadio = (e) => {
    console.log(e.target.value)
    setClient({
      ...client,
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
              client.first_name && client.last_name ? (
                <Avatar>
                  {client.first_name && client.first_name.charAt(0)}
                  {client.last_name && client.last_name.charAt(0)}
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
            // title={`${client.first_name} ${client.last_name}`}
            title={"Add New Client"}
            style={{ textAlign: "center" }}
            titleTypographyProps={{ variant: "h4" }}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  <RadioGroup
                    row
                    aria-label="isGroup1"
                    name="isGroup"
                    onChange={handleRadio}
                    value={client.isGroup}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio color="primary" />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio color="primary" />}
                      label="Group"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <PersonIcon />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="first_name"
                  onChange={handleChange}
                  value={client.first_name}
                  label={"First name"}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="last_name"
                  onChange={handleChange}
                  value={client.last_name}
                  label={"Last name"}
                  required
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <PhoneIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="phone"
                  onChange={handleChange}
                  value={client.phone}
                  label={"Phone number"}
                />
              </Grid>

              <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <EmailIcon />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  name="email"
                  onChange={handleChange}
                  value={client.email}
                  label={"Email address"}
                />
              </Grid>

              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={client.isCurrent}
                      onChange={handleChecked}
                      name="isCurrent"
                    />
                  }
                  label="Current client"
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
                  value={client.notes}
                  label={"Notes"}
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

export default CreateClient;
