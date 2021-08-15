import React, { useContext } from 'react';
import './style.css'

import CloseIcon from '../../assets/CloseIcon';
import StoreIcon from '../../assets/StoreIcon';
import StoreSelected from '../../assets/StoreSelected';
import UserIcon from '../../assets/UserIcon';

import { AuthContext } from '../../context/AuthContext';
import { useHistory, NavLink } from 'react-router-dom';


function Sidebar() {
  const history = useHistory();
  const { setToken } = useContext(AuthContext);

  const path = window.location.pathname;

  
  function handleClose() {
    setToken('');
    history.push('/');
    return;
  }
  return (
    <div className="sidebar">
      <div className="icon">
        <NavLink to="/produtos">
          {path.includes("/produtos") ? <StoreSelected /> : <StoreIcon />}
        </NavLink>

        <UserIcon />
        
        <div className="close" onClick={handleClose}>
          <CloseIcon/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;