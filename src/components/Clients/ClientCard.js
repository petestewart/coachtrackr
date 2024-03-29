import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: "80vw",
    borderRadius: 0,
    fontWeight: 600,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 11,
  },
});

const ClientCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={props.onClick} disableRipple={props.manageMode}>
        <CardContent>
          <Grid container>
            <Grid item>
              {props.manageMode ? <Checkbox checked={props.selected} /> : ""}
            </Grid>
            <Grid item>
              <Typography className={classes.title} gutterBottom>
                {`${props.firstName} ${props.lastName}`}
              </Typography>
              <Typography className={classes.subtitle} color="textSecondary">
                {`${
                  props.futureSessions ? props.futureSessions : "No"
                } upcoming ${
                  props.futureSessions === 1 ? "session" : "sessions"
                }, ${props.pastSessions ? props.pastSessions : "No"} past ${
                  props.futureSessions === 1 ? "session" : "sessions"
                }`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClientCard;
