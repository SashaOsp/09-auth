"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "./page.module.css";
import Link from "next/link";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", debouncedQuery, currentPage, tag],
    queryFn: () =>
      fetchNotes(debouncedQuery, currentPage, tag === "all" ? "" : (tag ?? "")),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setSearchQuery} />

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <Link href="/notes/action/create">Create note +</Link>
      </header>

      {isLoading && <p>Loading...</p>}

      {data && <NoteList notes={data.notes} />}
    </div>
  );
}
