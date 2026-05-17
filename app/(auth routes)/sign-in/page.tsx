"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, AuthRequest } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./page.module.css";

export default function SignIn() {
  const router = useRouter();

  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError("");

      const formValues = Object.fromEntries(formData) as AuthRequest;

      const user = await login(formValues);

      if (!user) {
        setError("Invalid email or password");
        return;
      }

      setUser(user);

      router.push("/profile");
    } catch (error) {
      const apiError = error as ApiError;

      setError(
        apiError.response?.data?.error ??
          apiError.message ??
          "Oops... some error",
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
