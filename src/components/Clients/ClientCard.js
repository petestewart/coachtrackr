import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
      <CardActionArea onClick={props.onClick}>
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          {`${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography className={classes.subtitle} color="textSecondary">
          {`${props.futureSessions} upcoming sessions, ${props.pastSessions} past sessions`}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClientCard;
