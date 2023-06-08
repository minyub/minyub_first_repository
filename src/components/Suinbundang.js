import React, { useEffect, useState } from 'react';

const Suinbundangline = () => {
  const [tableData, setTableData] = useState([]);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('https://api.odcloud.kr/api/15071311/v1/uddi:75461a18-17a3-42fe-9322-a51148003b69?page=1&perPage=10', {
        headers: {
          'accept': 'application/json',
          'Authorization': 'X%2BwnNlyKZOMuqODYZzIHbxqNL7td2RwG2qhyI1QDOTwnbWVvO6FhU5S4iJmbpDuKysqD%2B2Gv7HVOz17J5Y15YQ%3D%3D' // 인증 토큰을 넣어주세요
          // 다른 헤더도 필요한 경우 추가 가능
          // 'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`API 요청이 실패했습니다. 응답 상태코드: ${response.status}`);
      }

      const data = await response.json();

      // 데이터를 표 형식으로 가공하여 저장
      const formattedData = data.map((item) => {
        const timeData = [];
        let hour = 5; // 시작 시간 (5시부터 시작)
        let minutes = 30; // 시작 분 (30분부터 시작)

        for (let i = 0; i < 25; i++) {
          const timeKey = `${hour.toString().padStart(2, '0')}시${minutes.toString().padStart(2, '0')}분`;
          timeData.push(item[timeKey]);

          // 30분 간격으로 시간 증가
          if (minutes === 0) {
            hour++;
            minutes = 30;
          } else {
            minutes = 0;
          }
        }

        return {
          연번: item.연번,
          요일구분: item.요일구분,
          호선: item.호선,
          역번호: item.역번호,
          출발역: item.출발역,
          상하구분: item.상하구분,
          ...timeData.reduce(
            (acc, curr, index) => ({
              ...acc,
              [`${index + 1}시${index % 2 === 0 ? '30' : '00'}분`]: curr,
            }),
            {}
          ),
        };
      });

      setTableData(formattedData);
    } catch (error) {
      console.error(error);
      throw new Error('API 호출에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>연번</th>
            <th>요일구분</th>
            <th>호선</th>
            <th>역번호</th>
            <th>출발역</th>
            <th>상하구분</th>
            <th>5시30분</th>
            <th>6시00분</th>
            <th>6시30분</th>
            <th>7시00분</th>
            <th>7시30분</th>
            <th>8시00분</th>
            <th>8시30분</th>
            <th>9시00분</th>
            <th>9시30분</th>
            <th>10시00분</th>
            <th>10시30분</th>
            <th>11시00분</th>
            <th>11시30분</th>
            <th>12시00분</th>
            <th>12시30분</th>
            <th>13시00분</th>
            <th>13시30분</th>
            <th>14시00분</th>
            <th>14시30분</th>
            <th>15시00분</th>
            <th>15시30분</th>
            <th>16시00분</th>
            <th>16시30분</th>
            <th>17시00분</th>
            <th>17시30분</th>
            <th>18시00분</th>
            <th>18시30분</th>
            <th>19시00분</th>
            <th>19시30분</th>
            <th>20시00분</th>
            <th>20시30분</th>
            <th>21시00분</th>
            <th>21시30분</th>
            <th>22시00분</th>
            <th>22시30분</th>
            <th>23시00분</th>
            <th>23시30분</th>
            <th>00시00분</th>
            <th>00시30분</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.연번}>
              <td>{item.연번}</td>
              <td>{item.요일구분}</td>
              <td>{item.호선}</td>
              <td>{item.역번호}</td>
              <td>{item.출발역}</td>
              <td>{item.상하구분}</td>
              {Object.values(item).slice(6).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suinbundangline;
