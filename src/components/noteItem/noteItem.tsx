import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import React, {
  useCallback,
  useState,
} from "react";

import {
  useAppSelector,
  useThunkAppDispatch,
} from "../../store/hooks";
import {
  deleteNoteAction,
  selectAll,
  updateNoteAction,
} from "../../store/modules/notesSlice";

interface NoteItemProps {
  note: any;
}

const NoteItem: React.FC<NoteItemProps> = ({
  note,
}) => {
  const [openEdit, setOpenEdit] =
    useState<boolean>(false);
  const userLogged: any = useAppSelector(
    (state) => state.login
  );
  const listNotes = useAppSelector(selectAll);

  const [editTitle, setTitle] =
    useState<string>("");
  const [editDescription, setDescription] =
    useState<string>("");
  const thunkDispatch = useThunkAppDispatch();

  const handleDeleteNote = useCallback(
    (note: any) => {
      const path = {
        userId: userLogged.user.id,
        noteId: note._id,
      };
      // eslint-disable-next-line no-restricted-globals
      const deleted = confirm(
        "Deseja deletar essa nota?"
      );
      if (!deleted) {
        return;
      }
      if (deleted) {
        const result = thunkDispatch(
          deleteNoteAction(path)
        );
        alert("Nota apagada!");
      }
    },
    []
  );

  const openEditModal = useCallback(
    (note: any) => {
      setOpenEdit(true);
      setTitle(note._title);
      setDescription(note._description);
    },
    []
  );

  const handleArchived = () => {
    if (note._filed === false) {
      // eslint-disable-next-line no-restricted-globals
      const archived = confirm(
        "Deseja arquivar essa nota?"
      );
      if (!archived) {
        return;
      }
      const data = {
        userId: userLogged.user.id,
        noteId: note._id,
        title: note._title,
        description: note._description,
        filed: true,
      };
      const result = thunkDispatch(
        updateNoteAction(data)
      );
    }
    if (note._filed === true) {
      // eslint-disable-next-line no-restricted-globals
      const archived = confirm(
        "Deseja desarquivar essa nota?"
      );
      if (!archived) {
        return;
      }
      const data = {
        userId: userLogged.user.id,
        noteId: note._id,
        title: note._title,
        description: note._description,
        filed: false,
      };
      const result = thunkDispatch(
        updateNoteAction(data)
      );
    }
    alert("Nota arquivada!");
  };
  const handleEditNote = () => {
    if (!editTitle || editTitle.length < 3) {
      alert(
        "Titulo inválido! \nPreencha com pelo menos 3 caractéres"
      );
      return;
    }

    if (
      !editDescription ||
      editDescription.length < 3
    ) {
      alert(
        "Descrição inválida! \nPreencha com pelo menos 3 caractéres"
      );
      return;
    }
    const data = {
      userId: userLogged.user.id,
      noteId: note._id,
      title: editTitle,
      description: editDescription,
      filed: note._filed,
    };
    thunkDispatch(updateNoteAction(data));
    alert("Nota editada!");
    setOpenEdit(false);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <>
            <IconButton
              onClick={() => openEditModal(note)}
              edge="end"
              aria-label="edit"
              sx={{ paddingRight: "10px" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                handleDeleteNote(note)
              }
              edge="end"
              aria-label="delete"
              sx={{ paddingRight: "10px" }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => handleArchived()}
              edge="end"
              aria-label="archived"
            >
              <ArchiveIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={note._title}
          secondary={note._description}
        />
      </ListItem>
      <Divider variant="inset" />
      <Dialog
        open={openEdit}
        onClose={handleClose}
      >
        <DialogTitle>
          Edite seu recado!
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label="Titulo"
            type="text"
            value={editTitle || ""}
            onChange={(ev) =>
              setTitle(ev.target.value)
            }
            inputProps={{ maxLength: 200 }}
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            type="text"
            value={editDescription || ""}
            onChange={(ev) =>
              setDescription(ev.target.value)
            }
            inputProps={{ maxLength: 300 }}
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => handleEditNote()}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteItem;
