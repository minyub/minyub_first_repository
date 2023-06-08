// api.js

const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('api.odcloud.kr/api');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('API 호출에 실패했습니다.');
    }
  };
  
  export default fetchDataFromAPI;