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

  const addMonthInput = () => {
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

  const addDayInput = () => {
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
      <h4>Enter your Months</h4>
      {arr.map((month, m) => {
        return (
          <form>
            <input
              onChange={handleChange}
              value={month.value}
              id={m}
              type={month.type}
              size="40"
            />
          </form>
        );
      })}
      <button onClick={addMonthInput}>Add Another Month</button>
      <h4>Enter your Days</h4>
      {arr.map((day, d) => {
        return (
          <form>
            <input
              onChange={handleChange}
              value={day.value}
              id={d}
              type={day.type}
              size="40"
            />
          </form>
        );
      })}
      <button onClick={addDayInput}>Add Another Day</button>
      <br></br>
      <br></br>
      <button id="btn" type="button" onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Create;
