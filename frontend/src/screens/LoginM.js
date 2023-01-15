import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: 400,
      margin: `${theme.spacing(0)} auto`,
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
    },
    header: {
      textAlign: "center",
    },
    card: {
      marginTop: theme.spacing(10),
    },
    cardActions: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const LoginM = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    const { email, password } = inputs;
    setInputs({ email: "", password: "" });
    dispatch(login(email, password));
    //   const config = {
    //     headers: {
    //     'Content-Type': 'application/json'
    //     }
    // };
    //   const response = await axios.post(
    //     `${process.env.REACT_APP_BASE_URL}/auth/login`,
    //     { email, password },
    //     config
    //   )
    //   const { token } = response.data
    //   console.log(token)
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      onSubmit();
    }
  };
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="L O G I N" />
        <CardContent>
          <div>
            <TextField
              error={false}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={onChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={false}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={""}
              onChange={onChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            size="large"
            // color="secondary"
            onClick={onSubmit}
            disabled={false}
          >
            Login
          </Button>
          <Button variant="text" size="small" component={Link} to="/register">
            Register
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default LoginM;
