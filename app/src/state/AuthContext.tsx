import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

type StoredUser = AuthUser & { password: string };

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signUp: (data: { name: string; surname: string; email: string; password: string }) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  updateProfile: (data: Partial<Pick<AuthUser, 'name' | 'surname'>>) => void;
};

const Ctx = createContext<AuthContextValue | null>(null);

const USERS_KEY = 'users_v1';
const SESSION_KEY = 'session_v1';

function loadUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function loadSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}
function saveSession(id: string | null) {
  if (id) localStorage.setItem(SESSION_KEY, id);
  else localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const id = loadSession();
    if (!id) return;
    const u = loadUsers().find(u => u.id === id);
    if (!u) return;
    const { password, ...pub } = u;
    setUser(pub);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!user,
    signUp: ({ name, surname, email, password }) => {
      const users = loadUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already registered');
      }
      const id = crypto.randomUUID();
      const nu: StoredUser = { id, name, surname, email, password };
      users.push(nu);
      saveUsers(users);
      saveSession(id);
      setUser({ id, name, surname, email });
    },
    signIn: (email, password) => {
      const users = loadUsers();
      const u = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!u) throw new Error('Invalid credentials');
      saveSession(u.id);
      const { password: _, ...pub } = u;
      setUser(pub);
    },
    signOut: () => {
      saveSession(null);
      setUser(null);
    },
    updateProfile: (data) => {
      if (!user) return;
      const users = loadUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx < 0) return;
      users[idx] = { ...users[idx], ...data };
      saveUsers(users);
      setUser(prev => prev ? { ...prev, ...data } : prev);
    },
  }), [user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
