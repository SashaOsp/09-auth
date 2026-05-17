import { nextServer } from "./api";
import type { Note } from "@/types/note";
import type { NoteList } from "@/types/noteList";
import type { User } from "@/types/user";
import { cookies } from "next/headers";
const getCookieHeader = async () => {
  const cookieStore = await cookies();

  return {
    Cookie: cookieStore.toString(),
  };
};

export async function checkServerSession() {
  const headers = await getCookieHeader();

  const response = await nextServer.get("/auth/session", {
    headers,
  });

  return response;
}

export async function getServerMe(): Promise<User> {
  const headers = await getCookieHeader();

  const { data } = await nextServer.get<User>("/users/me", {
    headers,
  });

  return data;
}

export async function fetchServerNotes(
  search: string,
  page: number,
  tag?: string,
): Promise<NoteList> {
  const headers = await getCookieHeader();

  const params = {
    ...(search && { search }),
    ...(tag && { tag }),
    page,
    perPage: 12,
  };

  const { data } = await nextServer.get<NoteList>("/notes", {
    params,
    headers,
  });

  return data;
}

export async function fetchServerSingleNote(id: string): Promise<Note> {
  const headers = await getCookieHeader();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers,
  });

  return data;
}
