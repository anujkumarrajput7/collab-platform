import "./Signup.css";

function Signup() {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account 🚀</h2>
        <p className="subtitle">Join CollabMart and start collaborating</p>

        <form>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="extra-links">
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
