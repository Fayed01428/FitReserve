const express = require("express");
const router = express.Router();

const { classes, reservations } = require("../data/store");

router.post("/:classId", (req, res) => {
  const role = req.headers.role;

  if (role !== "Member") {
    return res.status(403).json({ error: "Members only" });
  }

  const classId = parseInt(req.params.classId);
  const { memberName } = req.body;

  const gymClass = classes.find((c) => c.id === classId);

  if (!gymClass) {
    return res.status(404).json({ error: "Class not found" });
  }

  if (gymClass.canceled) {
    return res.status(400).json({ error: "Class is canceled" });
  }

  if (gymClass.reserved >= gymClass.capacity) {
    return res.status(400).json({ error: "Class is full" });
  }

  const duplicate = reservations.find(
    (r) => r.classId === classId && r.memberName === memberName
  );

  if (duplicate) {
    return res.status(400).json({
      error: "You already reserved this class",
    });
  }

  const reservation = {
    id: reservations.length + 1,
    classId,
    memberName,
  };

  reservations.push(reservation);
  gymClass.reserved++;

  res.status(201).json(reservation);
});

router.get("/:memberName", (req, res) => {
  const memberReservations = reservations.filter(
    (r) => r.memberName === req.params.memberName
  );

  res.json(memberReservations);
});

module.exports = router;