import css from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
  description: "Manage your NoteHub profile details.",
  openGraph: {
    title: "Profile Page",
    url: "https://example.com/profile",
    description: "Manage your NoteHub profile details.",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 600,
        alt: "NoteHub",
      },
    ],
  },
};

export default async function Profile() {
  const user = await getServerMe();
  console.log(user);

  const avatarSrc =
    user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg";

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || "User"}</p>
          <p>Email: {user?.email || "No email provided"}</p>
        </div>
      </div>
    </main>
  );
}
