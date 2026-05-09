const classes = [
  {
    id: 1,
    name: "Yoga",
    instructor: "Sarah",
    date: "2026-05-20",
    capacity: 10,
    reserved: 0,
    canceled: false
  },
  {
    id: 2,
    name: "HIIT",
    instructor: "Mike",
    date: "2026-05-21",
    capacity: 5,
    reserved: 0,
    canceled: false
  }
];

const reservations = [];

module.exports = {
  classes,
  reservations
};