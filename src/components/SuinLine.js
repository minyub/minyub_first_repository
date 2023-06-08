import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js'; 



const StationData = require('./수인역 이용인원.json');

// 이전 코드와 동일
const months = [
  { value: '202304', label: '2023년 04월' },
  { value: '202303', label: '2023년 03월' },
  { value: '202302', label: '2023년 02월' },
  { value: '202301', label: '2023년 01월' },
];

const stations = [
  { value: '수인역', label: '수인역' },
  // 다른 역도 추가할 수 있음
];

const extractData = (selectedMonth, selectedStation) => {
  return StationData.filter(
    (data) =>
      data.use_mon === selectedMonth.value &&
      data.line_num === selectedStation.value
  );
};


const Graph = ({ data }) => {
  const timeSlots = useMemo(
    () => [
    
    '04시-05시',
    '05시-06시',
    '06시-07시',
    '07시-08시',
    '08시-09시',
    '09시-10시',
    '10시-11시',
    '11시-12시',
    '12시-13시',
    '13시-14시',
    '14시-15시',
    '15시-16시',
    '16시-17시',
    '17시-18시',
    '18시-19시',
    '19시-20시',
    '20시-21시',
    '21시-22시',
    '22시-23시',
    '23시-24시',
    '00시-01시',
    '01시-02시',
    '02시-03시',
    '03시-04시',
  ],
  []
);

  const chartData = useMemo(() => {
    return {
      labels: data.map((d) => d['지하철역']),
      datasets: timeSlots.map((timeSlot) => ({
        label: `${timeSlot} 승차인원`,
        data: data.map((d) => d[`${timeSlot} 승차인원`]),
      })),
    };
  }, [data, timeSlots]);

  useEffect(() => {
    let chartInstance = null;

    if (data.length > 0) {
      const chartOptions = {
        scales: {
          x: {
            display: true,
          },
        },
      };
  
      

      chartInstance = new Chart(document.getElementById('chart'), {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data, chartData]);

  return <Bar data={chartData} />;
};

// 이전 코드와 동일
const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedStation, setSelectedStation] = useState(stations[0]);
  const selectedData = extractData(selectedMonth, selectedStation);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleStationChange = (selectedOption) => {
    setSelectedStation(selectedOption);
  };

  return (
    <div>
      <div>
        <h2>월 선택</h2>
        <Select
          options={months}
          value={selectedMonth}
          onChange={handleMonthChange}
        />
      </div>
      <div>
        <h2>역 선택</h2>
        <Select
          options={stations}
          value={selectedStation}
          onChange={handleStationChange}
        />
      </div>
      <div>
        <h2>그래프</h2>
        <Graph data={selectedData} />
      </div>
    </div>
  );
};


export default App;
