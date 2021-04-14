import React, { useState, useRef} from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Header = () => {
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
                      to="/orders" 
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Klienci</NavLink>

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