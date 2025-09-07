import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth, isFirebaseAvailable } from "../lib/firebase"
