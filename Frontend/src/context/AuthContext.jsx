/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getSupabaseClient, isSupabaseConfigured, missingSupabaseMessage, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(isSupabaseConfigured ? undefined : null); // undefined = loading
  const [profile, setProfile] = useState(null);

  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  async function signIn(email, password) {
    if (!isSupabaseConfigured) return { error: new Error(missingSupabaseMessage) };

    const client = getSupabaseClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signUp(email, password, meta) {
    if (!isSupabaseConfigured) return { error: new Error(missingSupabaseMessage) };

    // meta: { first_name, last_name, phone }
    const client = getSupabaseClient();
    const { error } = await client.auth.signUp({
      email,
      password,
      options: { data: meta },
    });
    if (!error) {
      // The Postgres trigger automatically creates the profile row 
      // with first_name, last_name, and phone from raw_user_meta_data.
    }
    return { error };
  }

  async function signOut() {
    if (!isSupabaseConfigured) return;

    const client = getSupabaseClient();
    await client.auth.signOut();
  }

  const loading = session === undefined;

  return (
    <AuthContext.Provider value={{ session, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
