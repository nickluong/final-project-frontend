/*eslint-disable*/
import React, { Component } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";

// @material-ui/icons
import { Person, CloudDownload } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

class HeaderLinks extends Component {
  state = {
    loggedIn: localStorage.token !== undefined
  };

  handleLogOut = () => {
    localStorage.clear();
    this.setState({ loggedIn: !this.state.loggedIn });
    window.location = "/";
  };

  render() {
    const { classes } = this.props;
    return (
      <List className={classes.list}>
        {!this.state.loggedIn ? (
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
        ) : (
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText={localStorage.username}
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              buttonIcon={Person}
              dropdownList={[
                <a onClick={this.handleStart} className={classes.dropdownLink}>
                  Start Session
                </a>,
                <a
                  onClick={this.handleLogOut}
                  target="_blank"
                  className={classes.dropdownLink}
                >
                  Log Out
                </a>
              ]}
            />
          </ListItem>
        )}
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
}

export default withStyles(headerLinksStyle)(HeaderLinks);
