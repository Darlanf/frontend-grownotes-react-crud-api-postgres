import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createNote,
  deleteNote,
  listNotes,
  updateNote,
} from "../../services/api.service";
import {
  CreateNoteType,
  DeleteNoteType,
  UpdateNoteType,
  ListNoteType,
} from "../../types";

const notesAdapter = createEntityAdapter<any>({
  selectId: (note) => note._id,
});

export const listNotesAction = createAsyncThunk(
  "list/notes",
  async (list: ListNoteType) => {
    const result = await listNotes(list);

    if (result.ok) {
      return result.data;
    }
    return [];
  }
);

export const createNoteAction = createAsyncThunk(
  "create/notes",
  async (data: CreateNoteType) => {
    const result = await createNote(data);

    if (result.ok) {
      return result.data;
    }
    alert(result.message);
  }
);

export const deleteNoteAction = createAsyncThunk(
  "delete/notes",
  async (path: DeleteNoteType) => {
    const result = await deleteNote(path);

    if (result.ok) {
      return result.data;
    }
    alert(result.message);
  }
);

export const updateNoteAction = createAsyncThunk(
  "update/notes",
  async (data: UpdateNoteType) => {
    const result = await updateNote(data);
    let changes = {};

    if (result.ok) {
      changes = {
        _title: data.title,
        _description: data.description,
        _filed: data.filed,
      };
    }

    return {
      id: data.noteId,
      changes,
    };
  }
);
export const { selectAll, selectById } =
  notesAdapter.getSelectors(
    (state: any) => state.notes
  );

const notesSlice = createSlice({
  name: "notes",
  initialState: notesAdapter.getInitialState(),
  reducers: {
    addOne: notesAdapter.addOne,
    updateOne: notesAdapter.updateOne,
    setAll: notesAdapter.setAll,
    removeOne: notesAdapter.removeOne,
  },
  extraReducers(builder) {
    builder.addCase(
      listNotesAction.fulfilled,
      notesAdapter.setAll
    );
    builder.addCase(
      createNoteAction.fulfilled,
      notesAdapter.addOne
    );
    builder.addCase(
      deleteNoteAction.fulfilled,
      notesAdapter.removeOne
    );
    builder.addCase(
      updateNoteAction.fulfilled,
      notesAdapter.updateOne
    );
  },
});

export const {
  addOne,
  updateOne,
  setAll,
  removeOne,
} = notesSlice.actions;
export default notesSlice.reducer;
