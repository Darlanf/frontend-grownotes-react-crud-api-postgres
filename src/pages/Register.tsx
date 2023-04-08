import React, {
  // useEffect,
  useState,
} from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
// import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { createUser } from "../services/api.service";

const Register: React.FC = () => {
  const [username, setUsername] =
    useState<string>("");
  const [email, setMail] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  const [confirmPassword, setconfirmPassword] =
    useState<string>("");
  // const loginRedux = useAppSelector(state => state.login);
  // const userLogged = loginRedux.userList.findIndex(user => user.logged);

  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userLogged !== -1) {
  //     navigate('/');
  //   }
  // }, [loginRedux, navigate]);

  const handleRegister = async () => {
    if (!username || username.length < 3) {
      alert(
        "Preencha o nome de usuário com pelo menos 3 letras"
      );
      return;
    }

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

    if (
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert(
        "Os campos senha e confirme sua senha precisam ser iguais"
      );
      return;
    }

    const user = {
      username,
      email,
      password,
    };

    const result = await createUser(user);

    if (result.ok) {
      alert("Usuário criado com sucesso");
      navigate("/login");
      return;
    }

    alert(result.message.toString());
  };
  const handleToLogin = () => {
    navigate("/login");
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
              Cadastre seu nome, email e senha!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="username"
              onChange={(ev) =>
                setUsername(ev.target.value)
              }
              label="Username"
              value={username || ""}
              type="text"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email-basic"
              onChange={(ev) =>
                setMail(ev.target.value)
              }
              label="Email"
              value={email || ""}
              type="email"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password-basic"
              onChange={(ev) =>
                setPassword(ev.target.value)
              }
              label="Senha"
              value={password || ""}
              type="password"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="confirmPassword-basic"
              onChange={(ev) =>
                setconfirmPassword(
                  ev.target.value
                )
              }
              label="Confirme sua Senha"
              value={confirmPassword || ""}
              type="password"
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
                  onClick={handleRegister}
                  variant="contained"
                >
                  Cadastrar
                </Button>
                <Button
                  variant="text"
                  onClick={handleToLogin}
                >
                  Já possui conta? Faça login!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
