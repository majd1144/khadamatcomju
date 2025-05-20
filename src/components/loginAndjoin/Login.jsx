// import React, { useState } from "react";
// import { Link , useNavigate } from "react-router-dom"; 
// import "./Logins.css";

// export default function Signin({ theme }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
//   const navigate = useNavigate(); // Hook to navigate after successful login


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Email:", email);
//     console.log("Password:", password);

//     try {
      
//       const response = await fetch('http://localhost:4000/Login', {
//         method: "POST",
//         credentials: "include", 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: email,
//           password: password,
//         }),
//       });
      
//       const data = await response.json();
//     //   if (response.ok) {
        
//     //     // Login successful, redirect to homepage or dashboard
//     //     console.log("Login successful", data.message);
//     //     alert(data.message);
//     //     navigate("/"); // Adjust this based on your route
//     //     window.location.reload();
//     //   } else {
//     //     // Handle errors (incorrect password, user not found)
//     //     //setErrorMessage(data.message || "An error occurred. Please try again." );
//     //     console.log("Login failed:", data.message);
//     //     alert(data.message);
//     //   }
//     // } 
//     if (response.ok) {
//   // ✅ خزن الدور في localStorage
//   localStorage.setItem("userRole", data.role);

//   // ✅ طباعة و تنبيه المستخدم
//   console.log("Login successful", data.message);
//   alert(data.message);

//   // ✅ توجيه حسب الدور
//   if (data.role === "admin") {
//   navigate("/admin"); // ✅ استخدمي هذا المسار فقط
// } else {
//   navigate("/");
// }


//   window.location.reload();
// } else {
//   // ❌ تسجيل الدخول فشل
//   console.log("Login failed:", data.message);
//   alert(data.message);
// }
//     }
//     catch (error) {
//       console.error("Error: Error during login", error);
//       setErrorMessage("An error occurred while logging in.");
//     }
//   };


//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4 col-sm-12 col-xs-12">
//                    <h1 className="h">Welcome to khadamatkom</h1>
//                     <p className="para">
//                         At Khadmatkom, we provide the solutions you need with reliability
//                        and security, ensuring high-quality services that meet all your
//                        needs. Our goal is to make it easy to access services that offer
//                        peace of mind, affordable prices, and a swift, exceptional
//                        experience.  
//                     </p>
//             </div>

//             <div className="col-md-4"></div>

//            <div className="col-md-4 col-sm-12 col-xs-12">
//               <div className="signin-container">
//               <form onSubmit={handleSubmit} className="signin-form mt-5">
//               <h2>Login</h2>
//               <label>       
//               <input
//               type="email"
//               placeholder="Email@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required/>
//               </label>

//                 <label>       
//              <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//            />
//            </label>
//                 <button type="submit">Submit</button>
//                 <p className="signup-link">
//                  Forgot your password? <Link to="/reset-password">Reset it here</Link>
//                 </p>
//                 <p className="signup-link">
//                   Don't have an account?
//                   <Link to="/Join">signup</Link>
//                  </p>
                 
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
        import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./Logins.css";

export default function Signin({ theme }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/Login', {
        method: "POST",
        credentials: "include", 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        // خزني الدور في localStorage
        localStorage.setItem("userRole", data.role);

        alert(data.message);

        // التوجيه حسب الدور
        if (data.role === "admin") {
          navigate("/admin");  // توجه لصفحة أدمن حقيقية
        } else {
          navigate("/");  // توجه للصفحة الرئيسية للمستخدم العادي
        }

        window.location.reload();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12 col-xs-12">
          <h1 className="h">Welcome to khadamatkom</h1>
          <p className="para">
            At Khadmatkom, we provide the solutions you need with reliability
            and security, ensuring high-quality services that meet all your
            needs. Our goal is to make it easy to access services that offer
            peace of mind, affordable prices, and a swift, exceptional
            experience.  
          </p>
        </div>

        <div className="col-md-4"></div>

        <div className="col-md-4 col-sm-12 col-xs-12">
          <div className="signin-container">
            <form onSubmit={handleSubmit} className="signin-form mt-5">
              <h2>Login</h2>
              <label>       
                <input
                  type="email"
                  placeholder="Email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>       
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Submit</button>
              <p className="signup-link">
                Forgot your password? <Link to="/reset-password">Reset it here</Link>
              </p>
              <p className="signup-link">
                Don't have an account? <Link to="/Join">signup</Link>
              </p>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}