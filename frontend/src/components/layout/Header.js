import React, { useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import {logout} from '../../actions/auth';
import {useDetectOutsideClick} from '../hooks/useDetectOutsideClick';

const Header = () => {
    const menu = useRef(null);
    const [open, setOpen] = useDetectOutsideClick(menu, false)
    const is_admin = useSelector(state => state.auth.user.is_superuser)
    const email = useSelector(state => state.auth.user.email)
    const history = useHistory();
    const dispatch = useDispatch();

    const goSettings = () => {
      history.push('/settings')
      setOpen(!open)
    };

    const logOut = () => {
      dispatch(logout());
    };

    
    return (
        <div>
          <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">

                    <NavLink
                      exact
                      to="/" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Zlecenia</NavLink>
                    <NavLink
                      to="/orders/new" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Nowe Zlecenie</NavLink>                    
                    {is_admin &&
                    <div>
                    <NavLink 
                      to="/clients" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Klienci</NavLink>
                    <NavLink 
                      to="/employees" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Pracownicy</NavLink>
                    </div>
                    }

                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
        
                    <div className="ml-3 relative">
                      <div>
                        <button onClick={() => setOpen(!open)} type="button" className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                          <span className="sr-only">Open user menu</span>
                          <div className="flex-shrink-0 h-10 w-10">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="text-gray-300">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                              </svg>
                            </div>
                        </button>
                      </div>

                      { open && (
                      <div ref={menu} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                        <a className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-300" role="menuitem">{email}</a>
                        <a onClick={goSettings} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Ustawienia</a>
        
                        <a onClick={logOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Wyloguj się</a>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        
    )
}

export default Header
