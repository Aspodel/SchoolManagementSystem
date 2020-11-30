import React, { useEffect } from "react";
import "./TimeTable.scss";
import TitleBar from "../../../../components/TitleBar";

import { TimetableData } from "../../../../api/fakeData";

const Timetable = () => {
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {});

  return (
    <div className="time-table">
      <TitleBar title="View Timetable" />

      <table>
        <thead>
          <tr>
            <th>Period</th>
            {weekdays.map((day) => (
              <React.Fragment key={day}>
                <th>{day}</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {period.map((item, row) => (
            <tr key={row}>
              <td>{item}</td>

              {weekdays.map((day, column) => {
                const render = [];
                if (TimetableData[0][day]) {
                  const subjects = TimetableData[0][day];

                  var isInInterval = false;

                  for (var i = 0; i < subjects.length; i++) {
                    const startRow = subjects[i].startSlot - 1;
                    const endRow = startRow + subjects[i].sumSlot - 1;

                    if (startRow <= row && row <= endRow) {
                      isInInterval = true;

                      if (startRow === row) {
                        render.push(
                          <td className="subject" rowSpan={subjects[i].sumSlot}>
                            <div>
                              <span>{subjects[i].subject}</span>
                              <span>{"Room: " + subjects[i].room}</span>
                            </div>
                          </td>
                        );
                      }
                    }
                  }

                  if (isInInterval === false) {
                    render.push(<td></td>);
                  }
                } else {
                  render.push(<td></td>);
                }
                return <React.Fragment key={column}>{render}</React.Fragment>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
