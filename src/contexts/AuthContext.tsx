import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  error: null,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log("Checking admin status for user:", userId);
      const { data, error: adminError } = await supabase
        .from("admin_users")
        .select("is_super_admin")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (adminError) {
        console.error("Admin check error:", adminError);
        return false;
      }

      console.log("Admin status result:", data);
      return !!data?.is_super_admin;
    } catch (err) {
      console.error("Admin check error:", err);
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session initialization error:", sessionError);
          if (mounted) {
            setError(sessionError);
            setIsLoading(false);
          }
          return;
        }

        if (session?.user) {
          console.log("Session found, user:", session.user.email);
          if (mounted) {
            setUser(session.user);
            const adminStatus = await checkAdminStatus(session.user.id);
            setIsAdmin(adminStatus);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Authentication initialization failed"));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (!mounted) return;

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.user) {
          setUser(session.user);
          const adminStatus = await checkAdminStatus(session.user.id);
          setIsAdmin(adminStatus);
          setIsLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsAdmin(false);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin,
      isLoading,
      error,
    }}>
      {children}
    </AuthContext.Provider>
  );
};