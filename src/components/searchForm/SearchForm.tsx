import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  useAppSelector,
  useThunkAppDispatch,
} from "../../store/hooks";
import { listNotesAction } from "../../store/modules/notesSlice";

interface SearchFormProps {
  open: boolean;
  close: () => void;
}

export default function SearchForm({
  open,
  close,
}: SearchFormProps) {
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] =
    useState<string>("");
  const userLogged: any = useAppSelector(
    (state) => state.login
  );
  const thunkDispatch = useThunkAppDispatch();

  const handleChange = (
    event: SelectChangeEvent
  ) => {
    setStatus(event.target.value);
  };

  const handleClear = () => {
    setTitle("");
    setStatus("");
  };

  const handleSubmit = () => {
    if (!title) {
      setTitle("");
    }
    if (!status) {
      setStatus("");
    }
    const list = {
      userId: userLogged.user.id,
      title,
      filed: status,
    };
    const result = thunkDispatch(
      listNotesAction(list)
    );
    handleClear();
    close();
  };

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle>
          Filtre suas notas!
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={(ev) =>
              setTitle(ev.target.value)
            }
            id="title"
            label="Titulo da nota"
            type="search"
            fullWidth
            variant="outlined"
          />
          <InputLabel id="status-select-label">
            Selecione um status
          </InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value={""}>Todas</MenuItem>
            <MenuItem value={"true"}>
              Arquivadas
            </MenuItem>
            <MenuItem value={"false"}>
              Não arquivadas
            </MenuItem>
          </Select>
          {/* <TextField
            autoFocus
            margin="dense"
            onChange={(ev) =>
              setFiled(ev.target.value)
            }
            id="filed"
            label="Status da nota"
            type="select"
            fullWidth
            variant="outlined"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Filtrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
