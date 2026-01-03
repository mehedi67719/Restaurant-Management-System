import React, { useEffect, useState } from 'react';
import { Authcontext } from './Authcontext';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from '../../firebase.init';

const Authprovider = ({ children }) => {

  const [User, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
    });

    return () => unsubscribe();
  }, []);

  const createaccountwithemail = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return updateProfile(userCredential.user, {
          displayName: name,
        }).then(() => userCredential);
      });
  };

  const loginwithemail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginwithgoogle = () => {
    return signInWithPopup(auth, provider);
  };


  if(loading){
    return <p>Loading...</p>
  }
  const authinfo = {
    createaccountwithemail,
    loginwithemail,
    loginwithgoogle,
    User
  };

  return (
    <Authcontext value={authinfo}>
      {children}
    </Authcontext>
  );
};

export default Authprovider;
