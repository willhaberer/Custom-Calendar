import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_CALENDAR } from "../utils/mutations";

// import Auth from "../utils/auth";

const Create = () => {
  const { data } = useQuery(GET_ME);
  const [addCalendar] = useMutation(ADD_CALENDAR);

  const [currentYear, setCurrentYear] = useState(0);
  const [daysInYear, setDaysInYear] = useState(1);
  const [calendarName, setCalendarName] = useState("Name");

  const inputMonthArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const inputMonthDayAmountArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const userData = data?.me || {};

  const inputDayArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [monthArr, setMonthArr] = useState(inputMonthArr);
  const [monthDayAmountArr, setMonthDayAmountArr] = useState(
    inputMonthDayAmountArr
  );
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
    setMonthDayAmountArr((q) => {
      return [
        ...q,
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

  const getMonthIndex = async (month) => {
    return month;
  };

  const handleYearChange = (event) => {
    event.preventDefault();
    setCurrentYear(event.target.value);
  };

  const handleDayInYearChange = (event) => {
    event.preventDefault();
    setDaysInYear(event.target.value);
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

  const handleMonthDayAmountChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setMonthDayAmountArr((s) => {
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

  const handleGoBack = async (event) => {
    event.preventDefault();

    try {
      if (creationIndex === "startDate") {
        setCreationIndex("Year");
      } else if (creationIndex === "Year") {
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
      } else if (creationIndex === "Year") {
        setCreationIndex("startDate");
      } else {
        setCreationIndex("startDate");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const monthMap = monthArr.map((x) => x.value);
      const monthCountMap = monthDayAmountArr.map((x) => parseInt(x.value));
      const dayMap = dayArr.map((x) => x.value);
      const calName = calendarName;
      const setYear = parseInt(currentYear);
      const setDayCount = parseInt(daysInYear);
      const monthIndex = await getMonthIndex(dayMap[0]);
      console.log(monthIndex);

      const userInput = {
        name: calName,
        days: dayMap,
        months: monthMap,
        monthDayCount: monthCountMap,
        currentYear: setYear,
        daysInYear: setDayCount,
      };
      console.log(userInput);
      const data = await addCalendar({
        variables: { calendar: userInput },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  if (!userData?.username) {
    return (
      <div id="profilePage">
        <h1 id="welcome">You must be logged in to Create a Calendar</h1>
      </div>
    );
  }

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
        <h4>Enter How many days each month has</h4>
        {monthDayAmountArr.map((monthDay, mD) => {
          return (
            <form>
              <input
                onChange={handleMonthDayAmountChange}
                value={monthDay.value}
                id={mD}
                type={monthDay.type}
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
        <h4>Enter how many days are in a year</h4>
        <form>
          <input
            value={daysInYear}
            name="currentYear"
            onChange={handleDayInYearChange}
            type="year"
            placeholder="Days In Year"
            id="daysInYear"
          />
        </form>
        <br></br>
        <button id="btn" type="button" onClick={handleGoBack}>
          Back
        </button>
        <button id="btn" type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  } else if (creationIndex === "startDate") {
    return (
      <div>
        <h4>Enter your starting date</h4>
        <label htmlFor="startMonth">Choose your starting Month:</label>
        <select name="startMonth" id="startMonth">
          {monthArr.map((month, m) => {
            return <option value={month.value}>{month.value}</option>;
          })}
        </select>
        <br></br>
        <label htmlFor="startDay">Choose your starting Day:</label>
        <select name="startDay" id="startDay">
          {dayArr.map((day, d) => {
            return <option value={day.value}>{day.value}</option>;
          })}
        </select>
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
