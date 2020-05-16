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
          <p>{welcomeText}</p>
          <Link to="/projects">click here to visit our projects!</Link>
          <Route exact path="/projects" component={Projects} />
        </header>
      </div>
    </Router>
  );
}

export default App;
