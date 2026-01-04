import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import Spinner from './Spinner';
import { auth } from '../../firebase.init';

const Authprovider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const provider = new GoogleAuthProvider();

  const saveUserToBackend = async (user, nameOverride) => {
    if (!user) return;

    try {
      const userData = {
        uid: user.uid,
        name: nameOverride || user.displayName || user.email.split("@")[0],
        email: user.email,
        photoURL: user.photoURL || "",
        role: "user"
      };

      // Check if user already exists
      const res = await fetch(`http://localhost:3000/users/${encodeURIComponent(user.email)}`);
      
      if (res.status === 404) {
        // User not found, create new
        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
      }
      // If exists, do nothing
    } catch (error) {
      console.error("Backend user save error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setloading(false);

      if (currentUser) {
        await saveUserToBackend(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const createaccountwithemail = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update Firebase profile with name
    await updateProfile(userCredential.user, { displayName: name });

    // Save to backend with correct name
    await saveUserToBackend(userCredential.user, name);

    return userCredential;
  };

  const loginwithemail = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Ensure name exists for backend
    const nameToSave = userCredential.user.displayName || email.split("@")[0];
    await saveUserToBackend(userCredential.user, nameToSave);

    return userCredential;
  };

  const loginwithgoogle = async () => {
    const result = await signInWithPopup(auth, provider);

    // Ensure name exists for backend
    const nameToSave = result.user.displayName || result.user.email.split("@")[0];
    await saveUserToBackend(result.user, nameToSave);

    return result;
  };

  const logout = () => signOut(auth);

  if (loading) return <Spinner />;

  const authinfo = {
    createaccountwithemail,
    loginwithemail,
    loginwithgoogle,
    User,
    logout
  };

  return (
    <Authcontext value={authinfo}>
      {children}
    </Authcontext>
  );
};

export default Authprovider;
