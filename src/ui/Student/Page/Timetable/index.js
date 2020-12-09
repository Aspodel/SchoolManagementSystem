import React, { useEffect, useState } from "react";
import "./TimeTable.scss";
import TitleBar from "../../../../components/TitleBar";

// import { TimetableData } from "../../../../api/fakeData";
import { get_user_infor } from "../../../../api";

const TimeTable = () => {
  const period = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [registedCourses, setRegistedCourses] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUserInfor = async () => {
      const result = await get_user_infor();
      let list = result && result.data.courses.map((a) => a);
      setRegistedCourses(list);
    };

    getUserInfor();
  }, []);

  useEffect(() => {
    if (registedCourses.length > 0) {
      for (let i = 0; i < weekdays.length; i++) {
        let filter = registedCourses.filter((course) => course.day - 1 === i);
        if (filter.length > 0) {
          setData((prevState) => ({
            ...prevState,
            [weekdays[i]]: filter,
          }));
        }
      }
    }
  }, [registedCourses]);

  // useEffect(() => {
  //   console.log(data);
  //   console.log(TimetableData);
  // }, [data]);

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
                if (data[day]) {
                  const subjects = data[day];

                  var isInInterval = false;

                  for (var i = 0; i < subjects.length; i++) {
                    const startRow = subjects[i].startPeriod - 1;
                    const endRow = startRow + subjects[i].periods - 1;

                    if (startRow <= row && row <= endRow) {
                      isInInterval = true;

                      if (startRow === row) {
                        render.push(
                          <td className="subject" rowSpan={subjects[i].periods}>
                            <div>
                              <span>{subjects[i].coursesName}</span>
                              <span>
                                {"Room: " + subjects[i].room.toUpperCase()}
                              </span>
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

export default TimeTable;
