import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { firebaseAuth } from "@utils/firebaseClient";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

type AuthContextProps = {
  currentUser: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

export const AuthProvider: React.FC<any> = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
      // ログイン状態が変化すると呼ばれる
      if (!user) {
        router.push("/login");
      }
      setCurrentUser(user);
    });
  }, [router]);

  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
