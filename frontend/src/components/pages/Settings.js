import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {changePassword} from '../../actions/settings';

const Settings = () => {
    const [old_password, setOld_password] = useState('');
    const [new_password, setNew_password] = useState('');
    const [new_password2, setNew_password2] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (old_password && new_password && new_password2){
            dispatch(changePassword({old_password, new_password, new_password2}))
        }
    }

    return (
        <div>
        <div className="border-b border-gray-200 sm:rounded-lg bg-gray-50 p-4">
          <h1 className="m-2 font-bold text-gray-600 border-b border-gray-200 p-2">Zmień hasło</h1>
            <div className="m-4 relative rounded-md">
              <input 
                className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
                type="text"
                name="old_password"
                id="old_password"
                placeholder="Stare hasło"
                onChange={(e) => setOld_password(e.target.value)}
                />
            </div>
            <div className="m-4 relative rounded-md">
              <input 
                className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
                type="text"
                name="new_password"
                id="new_password"
                placeholder="Nowe hasło"
                onChange={(e) => setNew_password(e.target.value)}
                />
            </div>
            <div className="m-4 relative rounded-md">
              <input 
                className="focus:ring-indigo-500 focus:border-indigo-500 block px-6 py-2 sm:text-sm rounded-md"
                type="text"
                name="new_password2"
                id="new_password2"
                placeholder="Powtórz hasło"
                onChange={(e) => setNew_password2(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit} type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-700 text-base px-6 py-2 m-2 rounded-lg">Dodaj zlecenie</button>
  
        </div>
        </div>
    )
}

export default Settings
