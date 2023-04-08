import React, {
  useEffect,
  useState,
} from "react";
import {
  Button,
  Fab,
  Grid,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  useThunkAppDispatch,
  useAppSelector,
  useAppDispatch,
} from "../store/hooks";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar/ResponsiveAppBar";
import NoteItem from "../components/noteItem/noteItem";
import NoteForm from "../components/noteForm/noteForm";
import {
  listNotesAction,
  selectAll,
} from "../store/modules/notesSlice";
import SearchForm from "../components/searchForm/SearchForm";
import { logout } from "../store/modules/loginSlice";

const Home: React.FC = () => {
  const userLogged: any = useAppSelector(
    (state) => state.login
  );

  const listNotes = useAppSelector(selectAll);

  const thunkDispatch = useThunkAppDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userLogged.logged === false) {
      alert(
        "Realize o login para acessar suas notas!"
      );
      navigate("/login");
      return;
    }
    const list = {
      userId: userLogged.user.id,
    };
    thunkDispatch(listNotesAction(list));
  }, [userLogged, navigate, thunkDispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOff = () => {
    // eslint-disable-next-line no-restricted-globals
    const logoff = confirm(
      "Deseja realmente sair?"
    );
    if (logoff) {
      dispatch(logout());
    }
    navigate("/login");
  };

  return (
    <>
      <ResponsiveAppBar />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <NoteForm />
        </Grid>
        <Grid item xs={2}>
          <SearchForm
            open={open}
            close={handleClose}
          />
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleClickOpen}
          >
            <FilterAltIcon />
          </Fab>
        </Grid>
        {listNotes.length && (
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{ padding: "5px" }}
            >
              {listNotes.map((note: any) => {
                return (
                  <NoteItem
                    key={note._id}
                    note={note}
                  />
                );
              })}
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} display="flex">
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            onClick={handleLogOff}
          >
            Sair
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
