"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const loadUser = async () => {
      const isAuthenticated = await checkSession();

      if (!isAuthenticated) {
        clearIsAuthenticated();
        return;
      }

      const user = await getMe();

      if (user) {
        setUser(user);
      }
    };

    loadUser();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
