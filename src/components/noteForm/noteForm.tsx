import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import {
  useAppSelector,
  useThunkAppDispatch,
} from "../../store/hooks";
import { createNoteAction } from "../../store/modules/notesSlice";

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] =
    useState<string>("");
  const dispatch = useThunkAppDispatch();
  const userLogged: any = useAppSelector(
    (state) => state.login
  );
  const inputTitle = useRef<
    HTMLInputElement | undefined
  >();
  const inputDescription = useRef<
    HTMLInputElement | undefined
  >();

  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async () => {
    if (title.length < 3) {
      alert(
        "Preencha o titulo com no mininmo 3 caractéres."
      );
      inputTitle.current?.focus();
      return;
    }

    if (description.length < 3) {
      alert(
        "Preencha a descrição com no minimo 3 caractéres."
      );
      inputDescription.current?.focus();
      return;
    }

    const data = {
      userId: userLogged.user.id,
      title,
      description,
    };

    const result = await dispatch(
      createNoteAction(data)
    ).unwrap();
    alert("Nota criada com sucesso");

    handleClear();
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
    >
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={(ev) =>
            setTitle(ev.target.value)
          }
          label="Titulo"
          value={title || ""}
          variant="outlined"
          inputRef={inputTitle}
          inputProps={{ maxLength: 200 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id="outlined-basic"
          onChange={(ev) =>
            setDescription(ev.target.value)
          }
          label="Descrição"
          value={description || ""}
          variant="outlined"
          inputRef={inputDescription}
          inputProps={{ maxLength: 300 }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              onClick={handleClear}
              variant="outlined"
            >
              Limpar
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleSubmit}
              variant="contained"
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoteForm;
