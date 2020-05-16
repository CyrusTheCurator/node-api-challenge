const express = require("express");
const {
  get,
  insert,
  update,
  remove,
} = require("../../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  const actions = req.projectActions;
  console.log("your actions are ", req.projectActions);
  res.status(200).json({
    message: `all actions associated with project ${req.projectId}`,
    action: actions,
  });
});

router.get("/:id", (req, res) => {
  const projectId = req.projectId;
  const { id } = req.params;

  get(id)
    .then((action) => {
      if (!action) {
        res.status(404).json({
          message: "404: That action doesn't exist!",
        });
      }

      if (action.project_id && action.project_id != projectId) {
        res.status(400).json({
          message:
            "That action doesn't belong to this project! Stranger Danger!",
        });
      }

      res.status(200).json({
        message: "action retrieved successfully",
        action: action,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened in the action router... sorry?",
        err: err.message,
      });
    });
});

router.post("/", (req, res) => {
  const projectId = req.projectId;

  const newAction = req.body;
  newAction.project_id = projectId;
  insert(newAction)
    .then((newAction) => {
      res.status(200).json({
        message: "action posted successfully",
        action: newAction,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened in the action router... sorry?",
        err: err.message,
      });
    });
});

module.exports = router;
