// // components/loginAndjoin/ResetPassword.jsx
// import React, { useState } from "react";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       setMessage(data.message || "Check your email for reset instructions.");
//     } catch (err) {
//       setMessage("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleReset}>
//         <label>Email:</label>
//         <input
//           type="email"
//           required
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="form-control my-2"
//         />
//         <button type="submit" className="btn btn-primary">Send Reset Link</button>
//       </form>
//       {message && <p className="mt-3 text-success">{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ResetPassword.css"; // (اختياري: يمكن إنشاء ملف لتخصيص تنسيق إضافي)

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:4000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Check your email for reset instructions.");
      } else {
        setError(data.message || "Failed to send reset link.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "420px" }}>
        <h3 className="text-center mb-3 text-primary">🔐 Reset Your Password</h3>
        <form onSubmit={handleReset}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>

        {message && (
          <div className="alert alert-success mt-3" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        <div className="text-center mt-3">
          <Link to="/Login" className="small">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
