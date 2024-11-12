import { createContext } from "react";
import { User } from "firebase/auth";  // Assuming you're using Firebase

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);