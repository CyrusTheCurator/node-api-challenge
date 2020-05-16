import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

function Projects(props) {
  const [project, setProject] = useState({ project: "currently empty" });

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/1")
      .then((res) => {
        console.log(res);
        setProject(res.data.successMessage);
      })
      .catch((err) => console.error("There was an error, sorry. ", err));
  }, []);

  return (
    <>
      <div>name: {project.name}</div>
      <div>description: {project.description}</div>
    </>
  );
}
export default Projects;
