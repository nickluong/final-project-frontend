/* global chrome */
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/stars.gif";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      signIn: false
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
    document
      .querySelector(".MuiButton-label-69")
      .addEventListener("click", () => {
        window.location = "/";
      });
  }

  handleClick = () => {
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "", signIn: !this.state.signIn });
      }.bind(this),
      700
    );
    this.setState({
      cardAnimaton: "cardHidden"
    });
  };

  handleSubmit = () => {
    let username = document.getElementById("first").value;
    let password = document.getElementById("pass").value;
    if (username && password) {
      if (this.state.signIn) {
        fetch("http://localhost:3004/api/v1/users/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user: {
              username: username,
              password: password
            }
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(r => {
            console.log(r);
            console.log(this.props);
            localStorage.setItem("token", r.token);
            localStorage.setItem("userId", r.user.id);
            localStorage.setItem("username", r.user.username);
            this.props.history.push("/");
          });
      } else {
        fetch("http://localhost:3004/api/v1/users/signup", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            user: {
              username: username,
              password: password
            }
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw response;
            }
          })
          .then(response => {
            console.log("fetch response:", response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.user.id);
            localStorage.setItem("username", response.user.username);
            this.props.history.push("/");
          });
      }
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="Dolphin Connect"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      {this.state.signIn === false ? (
                        <h3>Sign Up</h3>
                      ) : (
                        <h3> Sign In </h3>
                      )}
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Username"
                        id="first"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end">
                              <People className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={this.handleSubmit}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                    {this.state.signIn === false ? (
                      <h6>
                        Already have an Account?
                        <Button
                          simple
                          color="primary"
                          size="sm"
                          onClick={this.handleClick}
                        >
                          Sign In
                        </Button>
                      </h6>
                    ) : (
                      <h6>
                        Need an Account?
                        <Button
                          simple
                          color="primary"
                          size="sm"
                          onClick={this.handleClick}
                        >
                          Sign Up
                        </Button>
                      </h6>
                    )}
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(LoginPage);
