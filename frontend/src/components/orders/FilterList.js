import React, { useState } from "react";

const FilterList = ({ onCompleted }) => {
  const [completed, setCompleted] = useState(false);

  const onChange = () => {
    setCompleted(!completed);
    onCompleted(!completed);
  };

  return (
    <div className="my-auto mx-6">
      <label className="flex">
        <input
          type="checkbox"
          className="form-checkbox h-4 w4 my-auto"
          defaultChecked={completed}
          onChange={onChange}
        />
        <span className="ml-2">Pokaż tylko zakończone</span>
      </label>
    </div>
  );
};

export default FilterList;
