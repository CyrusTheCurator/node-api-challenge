import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Projects from "./components/Projects";

function App() {
  const [projects, setProjects] = useState([]);
  const [welcomeText, setWelcomeText] = useState("Loading...");

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/")
      .then((res) => {
        console.log(res);
        setWelcomeText(res.data.message);
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>{welcomeText}</h1>
          <br />

          <Switch>
            <Route
              path="/projects/:id"
              render={(props) => <Projects {...props} />}
            />
            <Route
              path="/"
              render={(props) => (
                <Link to="/projects/1">click here to visit project 1</Link>
              )}
            />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
