import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

function Projects(props) {
  const [project, setProject] = useState({ actions: [] });
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
      <br />
      <div>description: {project.description}</div>
      {project.actions.length > 0 ? (
        project.actions.map((action) => {
          console.log("iterating");
          return (
            <>
              <br />

              <div>
                action {action.id}: {action.description}
              </div>
              <br />
            </>
          );
        })
      ) : (
        <div>No actions found, pardner</div>
      )}
    </>
  );
}
export default Projects;
