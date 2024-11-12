import { getAuth, GoogleAuthProvider, signInWithPopup ,User} from "firebase/auth";
import {  useEffect, useState } from "react"
import { app } from './firebase'; 
import { AuthContext } from "./AuthContext";


interface AuthProviderProps {
    children: React.ReactNode;  // children is of type React.ReactNode
  }

const AuthProvider : React.FC<AuthProviderProps> = ({children}) => {
    const [user , setUser] = useState<User | null>(null);
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider();

    useEffect(()=>{
      const storedUser = localStorage.getItem("user")
      if(storedUser){
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      }
    },[])

    const loginWithGoogle = async () =>{
        try {
            const loggedInUser = await signInWithPopup(auth , googleProvider);
            setUser(loggedInUser.user)
            localStorage.setItem("user",JSON.stringify(loggedInUser.user))
        } catch (error) {
            console.error("Login faild",error)
        }
    }

    const logout = () => {
        auth.signOut().then(()=>setUser(null))
        localStorage.removeItem("user")
    }

  return (
    <div>
      <AuthContext.Provider value={{user , loginWithGoogle , logout}}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
