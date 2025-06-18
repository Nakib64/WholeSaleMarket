import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';

const HoverDropdown = () => {
    const {user, logout, setUser} = useContext(AuthContext)
    console.log(user.photoURL);
    const handleLogout=()=>{
        logout().then(res=>{
            setUser(null)
        })
    }

  return (
     <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-9 lg:w-12 rounded-full">
          <img
            
            src= {user?.photoURL} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 shadow space-y-3">
        <li className='font-bold text-center text-lg'>{user.displayName}</li>
        <li onClick={handleLogout}><button className=' w-full py-2 text-center btn-accent btn text-lg text-white'>Logout</button></li>
      </ul>
    </div>
  );
};

export default HoverDropdown;
