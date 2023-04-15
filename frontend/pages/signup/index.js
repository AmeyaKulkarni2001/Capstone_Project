import { useState } from "react";
import { TextField, Button, Typography, Link } from "@material-ui/core";
import { signup } from "../../api/authAPICalls";
import ErrorMessage from "../../components/messages/ErrorMessage";
import SuccessMessage from "@/components/messages/SuccessMessage";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setSuccess("You have signed up successfully!");
        }
      })
      .catch(console.log("ERR IN SIGNUP"));
  };

  const SignupForm = () => {
    return (
      <form onSubmit={handleSubmit} className="signup-form">
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
        <Typography variant="body2" style={{ marginTop: "16px" }}>
          Already have an account?{" "}
          <Link href="/signin" color="primary">
            Login instead
          </Link>
        </Typography>
      </form>
    );
  };

  return (
    <>
      {SignupForm()}
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />
    </>
  );
};

export default Signup;
