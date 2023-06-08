import React from 'react';
import { Link } from 'react-router-dom';
import './SubwayLists.css';
import subwayIcon from '../images/SubwayIcon.png'; // 이미지 파일 경로


// 가상의 지하철 데이터
const subwayData = [
  { id: 1, name: '수인분당선', image: 'SubwayIcon.png' },
  { id: 2, name: '지하철 2호선', image: 'SubwayIcon.png' },
  { id: 3, name: '지하철 3호선', image: 'SubwayIcon.png' },
  // 추가적인 지하철 데이터를 원하는 만큼 추가
];

function Subwaylists() {
  return (
    <div>
      <h2>지하철 목록</h2>
      <div className="subway-list">
        {subwayData.map(subway => (
          <div key={subway.id} className="subway-item">
            <img src= {subwayIcon} alt={subway.name} />
            {subway.name === '수인분당선' ? (
              <Link to="/suinline">{subway.name}</Link>
            ) : (


            <p>{subway.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subwaylists;
