import React from "react";

interface CookieSaleData {
  city: string;
  time: string;
  sales: number;
}

interface TableProps {
  data: CookieSaleData[];
}

const App: React.FC<TableProps> = ({ data }) => {
  const cities = ["New York", "Seattle", "Paris", "Tokyo", "Sydney"];
  const hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

  // Generate random sales data for each city and hour
  const salesData = cities.map((city) =>
    hours.map((hour) => ({
      city,
      time: hour,
      sales: Math.floor(Math.random() * 100),
    }))
  );

  // Calculate the total sales for each hour and for each city
  const hourTotals = salesData[0].map((_, i) =>
    salesData.reduce((total, cityData) => total + cityData[i].sales, 0)
  );

  const cityTotals = salesData.map((cityData) =>
    cityData.reduce((total, { sales }) => total + sales, 0)
  );

  const totalSales = cityTotals.reduce((total, sales) => total + sales, 0);

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {hours.map((hour) => (
            <th key={hour}>{hour}</th>
          ))}
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((cityData, i) => (
          <tr key={cities[i]}>
            <td>{cities[i]}</td>
            {cityData.map(({ time, sales }) => (
              <td key={`${cities[i]}-${time}`}>{sales}</td>
            ))}
            <td>{cityTotals[i]}</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          {hourTotals.map((total, i) => (
            <td key={`total-${hours[i]}`}>{total}</td>
          ))}
          <td>{totalSales}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
