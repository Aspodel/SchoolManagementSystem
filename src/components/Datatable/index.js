import React from "react";

const Datatable = ({ data }) => {
  const columns = data[0] && Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {data[0] &&
            columns.map((heading) => (
              <th style={{ textTransform: "capitalize" }}>{heading}</th>
            ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column, index) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Datatable;
