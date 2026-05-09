const request = require("supertest");
const app = require("./server");

describe("FitReserve Backend API", () => {
  test("GET /classes returns available classes", async () => {
    const res = await request(app).get("/classes");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("Staff can create a class", async () => {
    const res = await request(app)
      .post("/classes")
      .set("role", "Staff")
      .send({
        name: "Pilates",
        instructor: "Emma",
        date: "2026-06-01",
        capacity: 12
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Pilates");
  });

  test("Member cannot create a class", async () => {
    const res = await request(app)
      .post("/classes")
      .set("role", "Member")
      .send({
        name: "Spin",
        instructor: "Alex",
        date: "2026-06-02",
        capacity: 10
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe("Staff access required");
  });

  test("Invalid capacity is rejected", async () => {
    const res = await request(app)
      .post("/classes")
      .set("role", "Staff")
      .send({
        name: "Boxing",
        instructor: "Mike",
        date: "2026-06-03",
        capacity: 31
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Capacity must be between 1 and 30");
  });

  test("Member can reserve a class", async () => {
    const res = await request(app)
      .post("/reservations/1")
      .set("role", "Member")
      .send({ memberName: "TestUser1" });

    expect(res.statusCode).toBe(201);
    expect(res.body.memberName).toBe("TestUser1");
  });

  test("Duplicate reservations are rejected", async () => {
    await request(app)
      .post("/reservations/2")
      .set("role", "Member")
      .send({ memberName: "DuplicateUser" });

    const res = await request(app)
      .post("/reservations/2")
      .set("role", "Member")
      .send({ memberName: "DuplicateUser" });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("You already reserved this class");
  });

  test("Staff cannot reserve a class", async () => {
    const res = await request(app)
      .post("/reservations/1")
      .set("role", "Staff")
      .send({ memberName: "StaffUser" });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe("Members only");
  });

  test("Reservation for nonexistent class is rejected", async () => {
    const res = await request(app)
      .post("/reservations/999")
      .set("role", "Member")
      .send({ memberName: "GhostUser" });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Class not found");
  });
});