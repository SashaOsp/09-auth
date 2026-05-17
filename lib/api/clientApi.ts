import { nextServer } from "@/lib/api/api";
import type { NewNote, Note } from "@/types/note";
import type { NoteList } from "@/types/noteList";
import { User } from "@/types/user";

export type AuthRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export interface EditRequest {
  username: string;
}

export const fetchNotes = async (
  note: string,
  page: number,
  tag?: string,
): Promise<NoteList> => {
  const options = {
    params: {
      search: note,
      page,
      perPage: 12,
      ...(tag ? { tag } : {}),
    },
  };

  const response = await nextServer.get<NoteList>("/notes", options);

  return response.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", newNote, {
    headers: {
      accept: "application/json",
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
  return response.data;
};

export const register = async (data: AuthRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export const login = async (data: AuthRequest) => {
  const response = await nextServer.post<User>("/auth/login", data);
  return response.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export async function updateMe(user: EditRequest): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", user);
  return data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
