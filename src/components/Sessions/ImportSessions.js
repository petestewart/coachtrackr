import React, { useEffect, useState, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";

// import Box from "@material-ui/core/Box";

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


const ImportSessions = ({ sessionId, ...props }) => {
  const [params, setParams] = useState({})

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleChecked = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.checked,
    });
  };

  const handleRadio = (e) => {
    console.log(e.target.value)
    setParams({
      ...params,
      [e.target.name]: e.target.value === "true",
    });
  };

  return (
    <div style={props.style} className={props.classes}>
      <form>
        <Card>
          <CardHeader
            
            action={
              <IconButton aria-label="cancel" onClick={props.handleClose}>
                <CloseIcon />
              </IconButton>
            }
            // title={`${params.first_name} ${params.last_name}`}
            title={"Import Sessions"}
            subheader={"Where would you like to import sessions from?"}
            style={{ textAlign: "center" }}
            titleTypographyProps={{ variant: "h4" }}
          />

          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={3}>
                  <RadioGroup
                    row
                    aria-label="isLocal1"
                    name="isLocal"
                    onChange={handleRadio}
                    value={params.isLocal}
                  >
                    <FormControlLabel
                      value={false}
                      control={<Radio color="primary" />}
                      label="Cloud"
                    />
                    <FormControlLabel
                      value={true}
                      control={<Radio color="primary" />}
                      label="Local File"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>

              {/* <Grid item xs={1}></Grid>
              <Grid item xs={1}>
                <PersonIcon />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  name="first_name"
                  onChange={handleChange}
                  value={params.first_name}
                  label={"First name"}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="last_name"
                  onChange={handleChange}
                  value={params.last_name}
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
                  value={params.phone}
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
                  value={params.email}
                  label={"Email address"}
                />
              </Grid>

              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={params.isCurrent}
                      onChange={handleChecked}
                      name="isCurrent"
                    />
                  }
                  label="Current session"
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
                  value={params.notes}
                  label={"Notes"}
                />
              </Grid> */}
              
            </Grid>

            <CardActions style={{ justifyContent: "center", marginTop: 10 }}>
              <>
                <Button color="primary" variant="contained">
                  Import
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

export default ImportSessions;
