import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your CollabMart account</p>

        <form>
          <div className="input-group">
            <label>Email or Username</label>
            <input type="text" placeholder="Enter your email or username" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="extra-links">
          <a href="#">Forgot Password?</a>
          <p>
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
