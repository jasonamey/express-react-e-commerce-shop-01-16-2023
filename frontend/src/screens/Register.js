import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
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

const RegisterM = () => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    password: "",
    email: "",
    name: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(inputs.name, inputs.email, inputs.password));
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      onSubmit();
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="S I G N U P" />
        <CardContent>
          <div>
            <TextField
              error={false}
              fullWidth
              id="name"
              type="text"
              label="Name"
              placeholder="Name"
              margin="normal"
              onChange={onChange}
              onKeyPress={handleKeyPress}
            />
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
            onClick={onSubmit}
            disabled={false}
          >
            Register
          </Button>
          <Button variant="text" size="small" component={Link} to="/login">
            Registered?
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default RegisterM;
