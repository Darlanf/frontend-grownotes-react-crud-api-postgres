import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  useAppSelector,
  useThunkAppDispatch,
} from "../store/hooks";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { loginAction } from "../store/modules/loginSlice";
// import { login } from "../store/modules/LoginSlice";

const Login: React.FC = () => {
  const userLogged = useAppSelector(
    (state) => state.login
  );
  const [email, setMail] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  // const dispatch = useAppDispatch();
  const thunkDispatch = useThunkAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userLogged = loginRedux.userList.findIndex(user => user.logged);
  //   if (userLogged !== -1) {
  //     navigate('/');
  //   }
  // }, [loginRedux, navigate]);

  const handleLogin = async () => {
    if (!email || email.length < 6) {
      alert(
        "Preencha o email com pelo menos 6 letras"
      );
      return;
    }
    if (!password || password.length < 6) {
      alert(
        "Preencha a senha com pelo menos 6 letras"
      );
      return;
    }

    const login = {
      email,
      password,
    };
    const result = await thunkDispatch(
      loginAction(login)
    ).unwrap();
    if (!result.ok) {
      alert(result.message);
      return;
    }
    navigate("/");
  };

  const handleToRegister = () => {
    navigate("/register");
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh", padding: "0 20px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
          >
            <Typography variant="h4">
              GrowNotes
            </Typography>
            <AssignmentIcon fontSize="large" />
          </Grid>
          <Grid item xs={12} alignItems="center">
            <Typography
              variant="h6"
              align="center"
            >
              Utilize seu email e senha para
              logar!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-email"
              onChange={(ev) =>
                setMail(ev.target.value)
              }
              label="Email"
              type="email"
              value={email || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-Password"
              onChange={(ev) =>
                setPassword(ev.target.value)
              }
              label="Senha"
              type="password"
              value={password || ""}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2}>
              <Grid
                xs="auto"
                item
                display="flex"
                justifyContent="space-evenly"
              >
                <Button
                  onClick={handleLogin}
                  variant="contained"
                >
                  Logar
                </Button>
                <Button
                  variant="text"
                  onClick={handleToRegister}
                >
                  Não possui conta? Cadastre-se
                  agora!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
