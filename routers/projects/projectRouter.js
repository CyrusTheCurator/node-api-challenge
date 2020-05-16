const express = require("express");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("../../data/helpers/projectModel");
const router = express.Router();
const actionRouter = require("../actions/actionRouter");
router.use("/:id/actions", IdPasser, actionPasser, actionRouter);

router.get("/", (req, res) => {
  // do your magic!
  res.status(200).json({
    message: "Welcome to my amazing sprint challenge front-end",
  });
});

router.get("/:id", (req, res) => {
  // do your magic!
  const { id } = req.params;

  get(id)
    .then((project) => {
      if (project) {
        res.status(200).json({
          message: "project retrieved successfully",
          successMessage: project,
        });
      } else {
        res.status(404).json({ message: "404: Project not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened... sorry?",
        err: err.message,
      });
    });
});

router.post("/", (req, res) => {
  const project = req.body;

  if (!project.name || !project.description) {
    res.status(400).json({
      message:
        "400: Please include properties: name, description ----- in your JSON request",
    });
  }

  insert(project)
    .then((project) => {
      res.status(200).json({
        message: "project posted successfully",
        project: project,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened... sorry?",
        err: err.message,
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  remove(id)
    .then((removedProj) => {
      res.status(200).json({
        message: "project deleted successfully",
        successMessage: removedProj ? "success!" : "something went silly",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened... sorry?",
        err: err.message,
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name || !changes.description) {
    res.status(400).json({
      message:
        "400: Please include properties: name, description ----- in your JSON request",
    });
  }

  update(id, changes)
    .then((modifiedProj) => {
      res.status(200).json({
        message: "project modified successfully",
        successMessage: modifiedProj,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened... sorry?",
        err: err.message,
      });
    });
});

function IdPasser(req, res, next) {
  const { id } = req.params;
  req.projectId = id;
  next();
}

function actionPasser(req, res, next) {
  const { id } = req.params;

  get(id)
    .then((project) => {
      if (project) {
        console.log("storing your precious value...");
        req.projectActions = project.actions;
        next();
      } else {
        res.status(404).json({ message: "404: Project not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "something bad happened... sorry?",
        err: err.message,
      });
    });
}

module.exports = router;
