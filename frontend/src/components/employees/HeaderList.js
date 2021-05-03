import React, { useState } from 'react'

const HeaderList = () => {
    const headers = [
        {name:"Email", field:"email"},
        {name:"Nazwa", field:"name"},
        {name:"Telefon", field:"phone"},
        {name:"Aktywny", field:"is_active"}
      ]
    return (
        <thead className="bg-gray-50">
            <tr>
                {headers.map(({ name, field }) => (
                <th 
                key={field}
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                    <div className="flex items-center h-4">
                        <div>
                            {name}
                        </div>
                    </div>
                </th>
                ))}
            </tr>
        </thead>
    )
}

export default HeaderList;
