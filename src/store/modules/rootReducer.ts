import { combineReducers } from "@reduxjs/toolkit";
import login from "./loginSlice";
import notes from "./notesSlice";

export default combineReducers({
  login,
  notes,
});
