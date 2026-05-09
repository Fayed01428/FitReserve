import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [classes, setClasses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [role, setRole] = useState("Member");
  const [message, setMessage] = useState("");

  const [newClass, setNewClass] = useState({
    name: "",
    instructor: "",
    date: "",
    capacity: 10,
  });

  const memberName = "John";

  useEffect(() => {
    fetchClasses();
    fetchReservations();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/classes");
      setClasses(res.data);
    } catch (err) {
      setMessage("Service unavailable. Please try again later.");
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/reservations/${memberName}`
      );
      setReservations(res.data);
    } catch (err) {
      setMessage("Could not load reservations.");
    }
  };

  const reserveClass = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/reservations/${id}`,
        { memberName },
        { headers: { role: "Member" } }
      );

      setMessage("Reserved successfully.");
      fetchClasses();
      fetchReservations();
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  const createClass = async () => {
    try {
      await axios.post("http://localhost:5000/classes", newClass, {
        headers: { role: "Staff" },
      });

      setMessage("Class created successfully.");
      setNewClass({
        name: "",
        instructor: "",
        date: "",
        capacity: 10,
      });
      fetchClasses();
    } catch (err) {
      setMessage(err.response?.data?.error || "Could not create class.");
    }
  };

  const cancelClass = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/classes/${id}/cancel`,
        {},
        { headers: { role: "Staff" } }
      );

      setMessage("Class canceled successfully.");
      fetchClasses();
    } catch (err) {
      setMessage(err.response?.data?.error || "Could not cancel class.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>FitReserve</h1>

      <label>
        Select Role:{" "}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Member</option>
          <option>Staff</option>
        </select>
      </label>

      {message && (
        <p
          style={{
            backgroundColor: "#eeeeee",
            padding: 10,
            border: "1px solid #cccccc",
          }}
        >
          {message}
        </p>
      )}

      <h2>Gym Classes</h2>

      {classes.length === 0 && <p>No available classes.</p>}

      {classes.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid black",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{c.name}</h3>
          <p>Instructor: {c.instructor}</p>
          <p>Date: {c.date}</p>
          <p>Capacity: {c.capacity}</p>
          <p>Reserved: {c.reserved}</p>
          <p>Remaining Spots: {c.capacity - c.reserved}</p>

          {role === "Member" && (
            <button onClick={() => reserveClass(c.id)}>Reserve</button>
          )}

          {role === "Staff" && (
            <button onClick={() => cancelClass(c.id)}>Cancel Class</button>
          )}
        </div>
      ))}

      {role === "Member" && (
        <>
          <h2>My Reservations</h2>

          {reservations.length === 0 && <p>You have no reservations.</p>}

          {reservations.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid gray",
                padding: 10,
                marginBottom: 10,
              }}
            >
              <p>Reservation ID: {r.id}</p>
              <p>Class ID: {r.classId}</p>
              <p>Member: {r.memberName}</p>
            </div>
          ))}
        </>
      )}

      {role === "Staff" && (
        <>
          <h2>Staff Panel: Create Class</h2>

          <input
            placeholder="Class name"
            value={newClass.name}
            onChange={(e) =>
              setNewClass({ ...newClass, name: e.target.value })
            }
          />

          <br />
          <br />

          <input
            placeholder="Instructor"
            value={newClass.instructor}
            onChange={(e) =>
              setNewClass({ ...newClass, instructor: e.target.value })
            }
          />

          <br />
          <br />

          <input
            type="date"
            value={newClass.date}
            onChange={(e) =>
              setNewClass({ ...newClass, date: e.target.value })
            }
          />

          <br />
          <br />

          <input
            type="number"
            placeholder="Capacity"
            value={newClass.capacity}
            onChange={(e) =>
              setNewClass({
                ...newClass,
                capacity: Number(e.target.value),
              })
            }
          />

          <br />
          <br />

          <button onClick={createClass}>Create Class</button>
        </>
      )}
    </div>
  );
}

export default App;