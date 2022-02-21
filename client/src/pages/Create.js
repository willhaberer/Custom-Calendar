import React, { useState } from "react";

function Create() {
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [monthArr, setMonthArr] = useState(inputArr);
  const [dayArr, setDayArr] = useState(inputArr);

  const addMonthInput = () => {
    setMonthArr((s) => {
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
    setDayArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleMonthChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setMonthArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleDayChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setDayArr((s) => {
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
      //   console.error(e);
    }
  };

  return (
    <div>
      <h4>Enter your Months</h4>
      {monthArr.map((month, m) => {
        return (
          <form>
            <input
              onChange={handleMonthChange}
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
      {dayArr.map((day, d) => {
        return (
          <form>
            <input
              onChange={handleDayChange}
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
