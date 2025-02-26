import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { FbConfig } from "../fbfiles/FbConfig";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


export const FormCustomHooks = ()=> {

    const navigate = useNavigate();
    const { db, auth } = FbConfig();
    const [user, setUser] = useState(null);
    const [error, setError] = useState({
        email: "",
        password: "",
        invalid: ""
    });

    onAuthStateChanged(auth, (user)=> {
        if(user){
            setUser(user);
            console.log("user logged in", user);
        }
        if(!user){
            console.log("user logged out")
        }
    })


    const login = (email, password)=> {
        if(!password){
            setError({password: "Please enter a password"});
            console.log(error)
        }
        if(!email){
            setError({email: "Please enter an email"});
        } 
        if(email && password){
            signInWithEmailAndPassword(auth, email, password)
        .then((cred)=> {
            setUser(cred.user)
            navigate("/")
        }).catch((err)=> {
            setError(err);
            if(err.message.includes("invalid")){
                setError({invalid: "invalid credentials"})
            }
        })
        }
    }

    const signup = (email, password)=> {
        if(!password){
            setError({password: "Please enter a password"});
            console.log(error)
        }
        if(!email){
            setError({email: "Please enter an email"});
        }
        if(email && password){
            createUserWithEmailAndPassword(auth, email, password)
        .then((cred)=> {
            setUser(cred.user)
            navigate('/')
        }).catch((err)=> {
            setError(err);
        })
        }
    }

    const logout = ()=> {
        signOut(auth)
        .then(()=> {
            setUser(null);
        })
    }


    return { login, signup, logout, user, error }
}