"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        {" "}
        NoteHub{" "}
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {isAuth && (
            <>
              <li>
                {" "}
                <Link href="/">Home</Link>{" "}
              </li>
              <li>
                {" "}
                <Link href="/notes/filter/all">Notes</Link>{" "}
              </li>
            </>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
