/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/login-page"
          target="_self"
          color="transparent"
          className={classes.navLink}
        >
          Signup / Login
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/profile-page"
          color="transparent"
          target="_self"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} />
          Download
        </Button>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
