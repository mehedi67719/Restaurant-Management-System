import React, { useContext } from 'react';
import { Authcontext } from '../Components/Authcontext';

const Useauth = () => {
    return (
       useContext(Authcontext)
    );
};

export default Useauth;