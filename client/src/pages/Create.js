import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CALENDAR } from "../utils/mutations";

const Create = () => {
  const [currentYear, setCurrentYear] = useState(0);
  const [calendarName, setCalendarName] = useState("Name");
  const [addCalendar] = useMutation(ADD_CALENDAR);
  const inputMonthArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const inputDayArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [monthArr, setMonthArr] = useState(inputMonthArr);
  const [dayArr, setDayArr] = useState(inputDayArr);
  const [creationIndex, setCreationIndex] = useState("Name");

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

  const handleYearChange = (event) => {
    event.preventDefault();
    setCurrentYear(event.target.value);
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setCalendarName(event.target.value);
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

  const [formState, setFormState] = useState({
    name: "",
    days: [],
    months: [],
    currentYear: 0,
  });

  const handleGoBack = async (event) => {
    event.preventDefault();

    try {
      if (creationIndex === "Year") {
        setCreationIndex("Day");
      } else if (creationIndex === "Day") {
        setCreationIndex("Month");
      } else if (creationIndex === "Month") {
        setCreationIndex("Name");
      } else {
        setCreationIndex("Name");
      }
    } catch (e) {
      //   console.error(e);
    }
  };

  const handleNext = async (event) => {
    event.preventDefault();

    try {
      if (creationIndex === "Name") {
        setCreationIndex("Month");
      } else if (creationIndex === "Month") {
        setCreationIndex("Day");
      } else if (creationIndex === "Day") {
        setCreationIndex("Year");
      } else {
        setCreationIndex("Year");
      }
    } catch (e) {
      //   console.error(e);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const monthMap = monthArr.map((x) => x.value);
      const dayMap = dayArr.map((x) => x.value);
      const calName = calendarName;
      const setYear = parseInt(currentYear);

      const userInput = {
        name: calName,
        days: dayMap,
        months: monthMap,
        currentYear: setYear,
      };
      console.log(userInput);
      const { data } = await addCalendar({
        variables: { ...userInput },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (creationIndex === "Name") {
    return (
      <div>
        <h4>Enter your Calendar's Name</h4>
        <form>
          <input
            value={calendarName}
            name="calendarName"
            onChange={handleNameChange}
            type="name"
            placeholder="Calendar Name"
            id="calendarName"
          />
        </form>
        <br></br>
        <br></br>
        <button id="btn" type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  } else if (creationIndex === "Month") {
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
        <br></br>
        <br></br>
        <button id="btn" type="button" onClick={handleGoBack}>
          Back
        </button>
        <button id="btn" type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  } else if (creationIndex === "Day") {
    return (
      <div>
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
        <button id="btn" type="button" onClick={handleGoBack}>
          Back
        </button>
        <button id="btn" type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  } else if (creationIndex === "Year") {
    return (
      <div>
        <h4>Enter your Current Year</h4>
        <form>
          <input
            value={currentYear}
            name="currentYear"
            onChange={handleYearChange}
            type="year"
            placeholder="Year"
            id="year"
          />
        </form>
        <br></br>
        <br></br>
        <button id="btn" type="button" onClick={handleGoBack}>
          Back
        </button>
        <button id="btn" type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </div>
    );
  }
};

export default Create;
