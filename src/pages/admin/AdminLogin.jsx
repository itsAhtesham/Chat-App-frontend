import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import {useEffect} from "react";
import { bgGradient } from "../../constants/color";
import { Navigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {adminLogin, getAdmin} from "../../redux/thunks/admin.js";

const AdminLogin = () => {
  const secretKey = useInputValidation("");

  const { isAdmin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdmin());
    }, [dispatch]);

  if (isAdmin) return <Navigate to={"dashboard"} />;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretKey.value))
  };

  return (
    <div
      style={{
        backgroundImage: bgGradient,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Container
          component={"main"}
          maxWidth="xs"
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: "fit-content",
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Admin Login</Typography>
            <form
              style={{
                width: "100%",
                marginTop: "1rem",
              }}
              onSubmit={submitHandler}
            >
              <TextField
                required
                fullWidth
                label="Secret Key"
                type="password"
                margin="normal"
                variant="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default AdminLogin;
