import { onAuthStateChanged } from "firebase/auth";
import {
  logoutFirebase,
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithGoogle
} from "./firebase/providers.js";
import { firebaseAuth } from "./firebase/config.js";

export const startGoogleSignIt = async (req, res) => {
  console.log("estoy en signInWithGoogle");

  try {
    const result = await signInWithGoogle();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const creatingUserWithEmailPassword = async (req, res) => {

  const { email, password, displayName } = req.body;

  try {
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({ displayName, email, password });
    res.status(200).json({ ok, displayName, photoURL, uid, errorMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const authenticateUserWithEmailPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { ok, displayName, photoURL, uid, errorMessage } =
      await loginWithEmailPassword({ email, password });
    res.status(200).json({ ok, displayName, photoURL, uid, errorMessage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutFirebase();
    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    res.status(400).json({ error: "Error al cerrar sesión" });
  }
};

export const getAuthenticatedUser = async (req, res) => {
  
  try {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({ error: "El usuario no se ha autenticado" });
      }
    });
  } catch (error) {
    res.status(401).json({ error: "El usuario no se ha autenticado" });
  }
};