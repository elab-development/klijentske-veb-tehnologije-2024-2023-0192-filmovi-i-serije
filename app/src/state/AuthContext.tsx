// state/AuthContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { User, type IUser } from '../models/users';

type StoredUser = IUser & { password: string };

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (data: { name: string; surname: string; email: string; password: string }) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  updateProfile: (data: Partial<Pick<IUser, 'name' | 'surname'>>) => void;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const id = loadSession();
    if (!id) return;
    const u = loadUsers().find(u => u.id === id);
    if (!u) return;
    // Instantiate domain model
    setUser(new User(u.id, u.name, u.surname, u.email));
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
      setUser(new User(id, name, surname, email));
    },
    signIn: (email, password) => {
      const users = loadUsers();
      const u = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!u) throw new Error('Invalid credentials');
      saveSession(u.id);
      setUser(new User(u.id, u.name, u.surname, u.email));
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
      const next = new User(
        user.id,
        data.name ?? user.name,
        data.surname ?? user.surname,
        user.email
      );
      setUser(next);
    },
  }), [user]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
