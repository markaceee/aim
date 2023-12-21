import React, { useState } from "react";
import { addMonths, format } from "date-fns";

const Month = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = [];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      format(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        "MM-dd-yyyy"
      )
    );
  }
  const changeMonth = (amount) => {
    setCurrentDate((prevDate) => addMonths(prevDate, amount));
  };
  const months = [
    { month: "january", id: "jan", title: "January" },
    { month: "february", id: "feb", title: "February" },
    { month: "march", id: "mar", title: "March" },
  ];

  const sampleData1 = [
    { date: "12-01-2023", data: 10 },
    { date: "02-06-2024", data: 10 },
    { date: "02-07-2024", data: 54234 },
  ];

  const monthString = (month) => {
    switch (month) {
      case 1:
        return "January";
        break;
      case 2:
        return "February";
        break;
      case 3:
        return "March";
        break;
      case 4:
        return "April";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "June";
        break;
      case 7:
        return "July";
        break;
      case 8:
        return "August";
        break;
      case 9:
        return "September";
        break;
      case 10:
        return "October";
        break;
      case 11:
        return "November";
        break;
      case 12:
        return "December";
        break;
    }
  };

  console.log(days);

  return (
    <div className="flex flex-col p-5 w-full">
      <div className="w-full flex justify-center items-center gap-5 p-5">
        <button
          onClick={() => {
            changeMonth(-1);
          }}
          className="bg-red-600 text-white h-1/2 p-2 rounded-md"
        >
          Last Month
        </button>
        <button
          onClick={() => {
            changeMonth(1);
          }}
          className="bg-blue-600 text-white h-1/2 p-2 rounded-md"
        >
          Next Month
        </button>

        <form className="flex gap-5 items-center m-5">
          <label htmlFor="month">Month</label>
          <select name="" id="month" className="border border-solid">
            {months.map((item, index) => {
              return (
                <option key={index} value={item.month}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <label htmlFor="year">Year</label>
          <input type="number" id="year" className="outline outline-1" />
          <button
            type="submit"
            className="bg-green-400 text-white p-4 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      <div className="w-full p-3 mb-0 bg-[#404D6C] border border-solid">
        <h1 className="text-3xl text-white">
          {monthString(currentDate.getMonth() + 1)} {currentDate.getFullYear()}
        </h1>
      </div>
      <table className="lesson-history-tbl table-auto border">
        <thead className="border border-solid">
          <tr className="">
            <th className="border border-solid border-r border-[#D0D0D0]">
              Day
            </th>
            {days.map((item, index) => {
              return (
                <th
                  className="border border-solid border-r border-[#D0D0D0] text-blue-500"
                  key={index}
                >
                  {item.split("-")[1]}
                </th>
              );
            })}
            <th className="border border-solid border-r border-[#D0D0D0]">
              Total
            </th>
            <th className="border border-solid border-r border-[#D0D0D0]">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Sample Data 1</th>
            {days.map((dayItem, index) => {
              const foundItem = sampleData1.find(
                (dataItem) => dataItem.date === dayItem
              );

              return (
                <td
                  key={index}
                  className="border border-solid border-r border-[#D0D0D0] text-center"
                >
                  {foundItem ? foundItem.data : "0"}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Month;
