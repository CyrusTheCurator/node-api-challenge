import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

function Projects(props) {
  const [project, setProject] = useState({ project: "currently empty" });
  const projectId = props.match.params.id;
  console.log("project id is ", projectId);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects/${projectId}`)
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
