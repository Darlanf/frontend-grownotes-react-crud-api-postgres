import axios from "axios";
import {
  ApiResponseType,
  CreateNoteType,
  CreateUserType,
  DeleteNoteType,
  LoginUserType,
  UpdateNoteType,
} from "../types";
import { ListNoteType } from "../types/NoteType";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// const api = axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const createUser = async (
  user: CreateUserType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post("/user", user);
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const loginUser = async (
  login: LoginUserType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post(
      "/user/login",
      login
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const listNotes = async (
  list: ListNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.get(
      `user/${list.userId}/notes?title=${
        list.title ?? ""
      }&filed=${list.filed ?? ""}`
    );

    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const createNote = async (
  data: CreateNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.post(
      `user/${data.userId}/notes`,
      data
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const deleteNote = async (
  path: DeleteNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.delete(
      `user/${path.userId}/notes/${path.noteId}`
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};

export const updateNote = async (
  data: UpdateNoteType
): Promise<ApiResponseType> => {
  try {
    const result = await api.put(
      `user/${data.userId}/notes/${data.noteId}`,
      data
    );
    return result.data;
  } catch (error: any) {
    if (error.request.response) {
      const result = error.request.response;
      return JSON.parse(result);
    }
    return {
      ok: false,
      message: error.toString(),
    };
  }
};
