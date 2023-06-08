import React, { useEffect, useState, useRef } from 'react';
import subwayData from './서울시 지하철 호선별 역별 시간대별 승하차 인원 정보.json';

import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';


Chart.register(CategoryScale, LinearScale, BarController, BarElement);


const ChartComponent = ({ graphData, graphOptions }) => {
    const chartRef = useRef(null);
  
    useEffect(() => {
      Chart.register(CategoryScale); // 카테고리 스케일 등록
  
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: graphData,
        options: graphOptions,
      });
  
      return () => {
        chart.destroy(); // 컴포넌트 언마운트 시 차트 인스턴스 파괴
      };
    }, [graphData, graphOptions]);
  
    return (
      <div>
        <canvas ref={chartRef}></canvas>
      </div>
    );
  };

const SubwayGraph = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [busiestTime, setBusiestTime] = useState('');
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = subwayData;
        const processedData = response.DATA.map((item) => ({
          eighteenRideNum: item.EIGHTEEN_RIDE_NUM,
          seventeenRideNum: item.SEVENTEEN_RIDE_NUM,
          eighteenAlightNum: item.EIGHTEEN_ALIGHT_NUM,
          tenRideNum: item.TEN_RIDE_NUM,
          twelveAlightNum: item.TWELVE_ALIGHT_NUM,
          eightAlightNum: item.EIGHT_ALIGHT_NUM,
          oneRideNum: item.ONE_RIDE_NUM,
          nineRideNum: item.NINE_RIDE_NUM,
          fifteenRideNum: item.FIFTEEN_RIDE_NUM,
          twentyRideNum: item.TWENTY_RIDE_NUM,
          twoAlightNum: item.TWO_ALIGHT_NUM,
          fourteenRideNum: item.FOURTEEN_RIDE_NUM,
          twentyThreeRideNum: item.TWENTY_THREE_RIDE_NUM,
          useMon: item.USE_MON,
          lineNum: item.LINE_NUM,
          elevenRideNum: item.ELEVEN_RIDE_NUM,
          thirteenRideNum: item.THIRTEEN_RIDE_NUM,
          twentyOneAlightNum: item.TWENTY_ONE_ALIGHT_NUM,
          twentyOneRideNum: item.TWENTY_ONE_RIDE_NUM,
          fourteenAlightNum: item.FOURTEEN_ALIGHT_NUM,
          sevenRideNum: item.SEVEN_RIDE_NUM,
          elevenAlightNum: item.ELEVEN_ALIGHT_NUM,
          tenAlightNum: item.TEN_ALIGHT_NUM,
          fourRideNum: item.FOUR_RIDE_NUM,
          midnightAlightNum: item.MIDNIGHT_ALIGHT_NUM,
          midnightRideNum: item.MIDNIGHT_RIDE_NUM,
          sixteenAlightNum: item.SIXTEEN_ALIGHT_NUM,
          twentyTwoRideNum: item.TWENTY_TWO_RIDE_NUM,
          nineteenAlightNum: item.NINETEEN_ALIGHT_NUM,
          fiveAlightNum: item.FIVE_ALIGHT_NUM,
          sixAlightNum: item.SIX_ALIGHT_NUM,
          twentyTwoAlightNum: item.TWENTY_TWO_ALIGHT_NUM,
          fiveRideNum: item.FIVE_RIDE_NUM,
          sixRideNum: item.SIX_RIDE_NUM,
          nineAlightNum: item.NINE_ALIGHT_NUM,
          fourAlightNum: item.FOUR_ALIGHT_NUM,
          sixteenRideNum: item.SIXTEEN_RIDE_NUM,
          threeRideNum: item.THREE_RIDE_NUM,
          thirteenAlightNum: item.THIRTEEN_ALIGHT_NUM,
          seventeenAlightNum: item.SEVENTEEN_ALIGHT_NUM,
          threeAlightNum: item.THREE_ALIGHT_NUM,
          twentyAlightNum: item.TWENTY_ALIGHT_NUM,
          twoRideNum: item.TWO_RIDE_NUM,
          eightRideNum: item.EIGHT_RIDE_NUM,
          fifteenAlightNum: item.FIFTEEN_ALIGHT_NUM,
          nineteenRideNum: item.NINETEEN_RIDE_NUM,
          sevenAlightNum: item.SEVEN_ALIGHT_NUM,
        }));

        setData(processedData);
      } catch (error) {
        console.log('Error fetching subway data:', error);
      }
    };

    fetchData();
  }, []);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data.length > 0 && selectedMonth && selectedStation) {
      const stationData = data.filter(
        (item) => item.useMon === selectedMonth && item.lineNum === selectedStation
      )[0];

      const chartData = {
        labels: [
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
        ],
        datasets: [
          {
            label: '승차인원',
            data: stationData && stationData.fiveRideNum ? [
              stationData.fiveRideNum,
              stationData.sixRideNum,
              stationData.sevenRideNum,
              stationData.eightRideNum,
              stationData.nineRideNum,
              stationData.tenRideNum,
              stationData.elevenRideNum,
              stationData.twelveRideNum,
              stationData.thirteenRideNum,
              stationData.fourteenRideNum,
              stationData.fifteenRideNum,
              stationData.sixteenRideNum,
              stationData.seventeenRideNum,
              stationData.eighteenRideNum,
              stationData.nineteenRideNum,
              stationData.twentyRideNum,
              stationData.twentyOneRideNum,
              stationData.twentyTwoRideNum,
              stationData.twentyThreeRideNum,
              stationData.midnightRideNum,
              stationData.oneRideNum,
              stationData.twoRideNum,
              stationData.threeRideNum,
              stationData.fourRideNum,
            ] : [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: '하차인원',
            data: stationData && stationData.fiveAlightNum ? [
              stationData.fiveAlightNum,
              stationData.sixAlightNum,
              stationData.sevenAlightNum,
              stationData.eightAlightNum,
              stationData.nineAlightNum,
              stationData.tenAlightNum,
              stationData.elevenAlightNum,
              stationData.twelveAlightNum,
              stationData.thirteenAlightNum,
              stationData.fourteenAlightNum,
              stationData.fifteenAlightNum,
              stationData.sixteenAlightNum,
              stationData.seventeenAlightNum,
              stationData.eighteenAlightNum,
              stationData.nineteenAlightNum,
              stationData.twentyAlightNum,
              stationData.twentyOneAlightNum,
              stationData.twentyTwoAlightNum,
              stationData.twentyThreeAlightNum,
              stationData.midnightAlightNum,
              stationData.oneAlightNum,
              stationData.twoAlightNum,
              stationData.threeAlightNum,
              stationData.fourAlightNum,
            ] : [],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
    
      setChartData(chartData);


      const chartOptions = {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true,
            },
          },
        },
      };

    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
      });
    }

      const busiestIndex = chartData.datasets[0].data.reduce(
        (maxIndex, dataPoint, currentIndex, array) => {
          if (dataPoint > array[maxIndex]) {
            return currentIndex;
          } else {
            return maxIndex;
          }
        },
        0
      );

      setBusiestTime(chartData.labels[busiestIndex]);
    }
  }, [data, selectedMonth, selectedStation]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleStationChange = (event) => {
    setSelectedStation(event.target.value);
  };

  return (
    <div>
      <h1>서울시 지하철 호선별 역별 시간대별 승하차 인원 정보</h1>
      <div>
        <label htmlFor="month-select">월 선택:</label>
        <select id="month-select" onChange={handleMonthChange}>
          <option value="">전체</option>
          <option value="202304">2023년 4월</option>
          <option value="202302">2023년 3월</option>
          <option value="202302">2023년 2월</option>
          <option value="202301">2023년 1월</option>
          <option value="202212">2022년 12월</option>
          <option value="202211">2022년 11월</option>
        </select>
      </div>
      <div>
        <label htmlFor="station-select">역 선택:</label>
        <select id="station-select" onChange={handleStationChange}>
            <option value="">전체</option>
            <option value="성남">성남</option>
            <option value="모란">모란</option>
            <option value="망포">망포</option>
            <option value="영통">영통</option>
            <option value="백석">백석</option>
            <option value="대장">대장</option>
            <option value="곡정">곡정</option>
            <option value="정자">정자</option>
            <option value="미금">미금</option>
            <option value="동천">동천</option>
            <option value="수지구청">수지구청</option>
            <option value="성복">성복</option>
            <option value="상현">상현</option>
            <option value="광교중앙">광교중앙</option>
            <option value="광교">광교</option>
        </select>
      </div>
      <div>
        {selectedMonth && selectedStation && busiestTime && (
          <p>
            {selectedMonth} {selectedStation}호선의 가장 혼잡한 시간대는 {busiestTime}입니다.
          </p>
        )}
      </div>
      <ChartComponent graphData={chartData} graphOptions={{}} />
    </div>
  );
};

export default SubwayGraph;
