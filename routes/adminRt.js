const express = require("express");
const router = express.Router();
const db = require("../db-config");

// ---------------- USERS ----------------
router.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT id, firstname, lastname, email, role, governorate, createdat FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to load users" });
  }
});

router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const result = await db.query("UPDATE users SET role = $1 WHERE id = $2 RETURNING *", [role, id]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ---------------- WORKERS ----------------
router.get("/workers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM workers");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching workers:", err);
    res.status(500).json({ error: "Failed to load workers" });
  }
});

router.patch("/workers/:id", async (req, res) => {
  const { id } = req.params;
  const { servicecategory, fee } = req.body;
  try {
    const result = await db.query(
      "UPDATE workers SET servicecategory = $1, fee = $2 WHERE id = $3 RETURNING *",
      [servicecategory, fee, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating worker:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

router.delete("/workers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM workers WHERE id = $1", [id]);
    res.status(200).json({ message: "Worker deleted" });
  } catch (err) {
    console.error("Error deleting worker:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ---------------- BOOKINGS ----------------
router.get("/bookings", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT sr.id, sr.userid, sr.workerid, sr.servicedate, sr.status, sr.urgency,
             u.firstname AS user_firstname, u.lastname AS user_lastname,
             wu.firstname AS worker_firstname, wu.lastname AS worker_lastname,
             w.servicecategory AS worker_service, w.experience, w.fee
      FROM service_requests sr
      JOIN users u ON sr.userid = u.id
      JOIN workers w ON sr.workerid = w.id
      JOIN users wu ON w.userid = wu.id
      ORDER BY sr.servicedate DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to load bookings" });
  }
});

// ✅ Update booking status
router.patch("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log("🛠️ Updating booking status...");
  console.log("📦 Booking ID:", id);
  console.log("📌 New Status:", status);

  try {
    const result = await db.query(
      "UPDATE service_requests SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Status updated", booking: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating booking status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ---------------- REVIEWS ----------------
router.get("/reviews", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT r.id, r.comment, r.rating, r.createdat,
             r.workerid, r.userid,
             u.firstname || ' ' || u.lastname AS user_name,
             wu.firstname || ' ' || wu.lastname AS worker_name
      FROM reviews r
      JOIN users u ON r.userid = u.id
      JOIN workers w ON r.workerid = w.id
      JOIN users wu ON w.userid = wu.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM reviews WHERE id = $1", [id]);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
