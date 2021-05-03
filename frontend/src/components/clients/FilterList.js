import React, { useState } from 'react'

const FilterList = ({ onDeleted }) => {
    const [deleted, setDeleted] = useState(false);

    const onChange = () => {
        setDeleted(!deleted)
        onDeleted(!deleted)
    }

    return (
        <div className="my-auto mx-6">
            <label className="flex">
                <input type="checkbox" className="form-checkbox h-4 w4 my-auto" defaultChecked={deleted} onChange={onChange}/>
                <span className="ml-2">
                    Pokaż usuniętych klientów
                </span>
            </label>
        </div>
    )
}

export default FilterList
