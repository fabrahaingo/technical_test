import "./App.css";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Home } from "./../Home/Home";
import { Jurisdiction } from "./../Jurisdiction/Jurisdiction";
import { Decision } from "../Decision/Decision";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <CssBaseline />
          <AppBar
            position="static"
            color="inherit"
            style={{ backgroundColor: "#02b875" }}
          >
            <Toolbar>
              <Link to="/">
                <Typography variant="h6" style={{ color: "#fff" }}>
                  DOCTRINE
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>

          <div style={{ maxWidth: "960px", margin: "auto" }}>
            <>
              <Route path="/" exact component={Home} />
              <Route path="/jurisdiction/:id" component={Jurisdiction} />
              <Route path="/d/:id" component={Decision} />
            </>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
