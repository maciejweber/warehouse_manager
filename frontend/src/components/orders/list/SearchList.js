import React, { useState } from 'react'

const SearchList = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    
    const onInputChange = (value) => {
        setSearch(value);
        onSearch(value);
    }

    return (
        <div className="mt-1 relative rounded-md shadow-sm">
        <input 
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
            type="text"
            name="value"
            id="value"
            placeholder="Szukaj" 
            value={search}
            onChange={(e)=>onInputChange(e.target.value)} 
        />
    </div>
    )
}

export default SearchList;
