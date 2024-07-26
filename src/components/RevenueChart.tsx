import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { companyApi } from "../services";
import { Revenue } from "../types/Revenue";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

interface RevenueChartProps {
  companyId: number;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ companyId }) => {
  const [revenueData, setRevenueData] = useState<Revenue[]>([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      const data = await companyApi.getRevenueByCompany(companyId);
      setRevenueData(data);
    };
    fetchRevenueData();
  }, [companyId]);

  // Aggregate revenue data by location
  const aggregateRevenueByLocation = () => {
    const locationRevenueMap: { [key: string]: number } = {};
    revenueData.forEach((revenue) => {
      if (!locationRevenueMap[revenue.location_name]) {
        locationRevenueMap[revenue.location_name] = 0;
      }
      locationRevenueMap[revenue.location_name] += revenue.revenue;
    });
    return Object.keys(locationRevenueMap).map((key) => ({
      name: key,
      value: locationRevenueMap[key],
    }));
  };

  const aggregateRevenueByYearAndLocation = () => {
    const yearLocationRevenueMap: { [key: number]: { [key: string]: number } } = {};
    revenueData.forEach((revenue) => {
      if (!yearLocationRevenueMap[revenue.year]) {
        yearLocationRevenueMap[revenue.year] = {};
      }
      if (!yearLocationRevenueMap[revenue.year][revenue.location_name]) {
        yearLocationRevenueMap[revenue.year][revenue.location_name] = 0;
      }
      yearLocationRevenueMap[revenue.year][revenue.location_name] += revenue.revenue;
    });

    // Transform the data into an array of objects
    const result: { year: number; [key: string]: number }[] = [];
    Object.keys(yearLocationRevenueMap).forEach((year) => {
      const yearData: { year: number; [key: string]: number } = { year: Number(year) };
      Object.keys(yearLocationRevenueMap[Number(year)]).forEach((location) => {
        yearData[location] = yearLocationRevenueMap[Number(year)][location];
      });
      result.push(yearData);
    });
    return result;
  };

  // Aggregate revenue data to display in charts
  const aggregatedLocationData = aggregateRevenueByLocation();
  const aggregatedYearLocationData = aggregateRevenueByYearAndLocation();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h4>Pie Chart (Revenue by Location)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={aggregatedLocationData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {aggregatedLocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col-md-6">
          <h4>Bar Chart (Revenue by Location)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={aggregatedLocationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h4>Line Chart (Revenue by Year & Location)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aggregatedYearLocationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(aggregatedYearLocationData[0] || {})
                .filter((key) => key !== "year")
                .map((location, index) => (
                  <Line
                    key={`line-${index}`}
                    type="monotone"
                    dataKey={location}
                    stroke={COLORS[index % COLORS.length]}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
