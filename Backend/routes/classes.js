const express = require("express");
const router = express.Router();

const { classes } = require("../data/store");
const { validCapacity } = require("../utils/validation");

router.get("/", (req, res) => {
  const activeClasses = classes.filter((c) => !c.canceled);
  res.json(activeClasses);
});

router.post("/", (req, res) => {
  const role = req.headers.role;

  if (role !== "Staff") {
    return res.status(403).json({ error: "Staff access required" });
  }

  const { name, instructor, date, capacity } = req.body;

  if (!validCapacity(capacity)) {
    return res.status(400).json({
      error: "Capacity must be between 1 and 30",
    });
  }

  const newClass = {
    id: classes.length + 1,
    name,
    instructor,
    date,
    capacity,
    reserved: 0,
    canceled: false,
  };

  classes.push(newClass);
  res.status(201).json(newClass);
});

router.put("/:id/cancel", (req, res) => {
  const role = req.headers.role;

  if (role !== "Staff") {
    return res.status(403).json({ error: "Staff access required" });
  }

  const gymClass = classes.find((c) => c.id === parseInt(req.params.id));

  if (!gymClass) {
    return res.status(404).json({ error: "Class not found" });
  }

  gymClass.canceled = true;
  res.json({ message: "Class canceled" });
});

module.exports = router;