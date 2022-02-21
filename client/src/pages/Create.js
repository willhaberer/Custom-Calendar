import React, { useState } from "react";

function Create() {
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("handle form submit");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {arr.map((item, i) => {
        return (
          <form>
            <input
              onChange={handleChange}
              value={item.value}
              id={i}
              type={item.type}
              size="40"
            />
          </form>
        );
      })}
      <button onClick={addInput}>Add Another</button>
      <button id="btn" type="button" onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Create;
