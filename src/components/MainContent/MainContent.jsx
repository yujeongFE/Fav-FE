import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MainContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  const todayDate = new Date().toLocaleDateString();  // 오늘 날짜 설정
  
  // 12:00 AM부터 11:59 PM까지 시간대 생성
  const times = [
    '12:00 AM', '02:00 AM', '04:00 AM', '06:00 AM', '08:00 AM', '10:00 AM',
    '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM', '11:59 PM'
  ];

  // 랜덤 값 생성 함수 (min~max 사이 값)
  const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // 시간대별 값이 총합을 맞추도록 랜덤 값 분배 함수
  const generateRandomData = (todayTotal, yesterdayTotal, lastWeekTotal) => {
    const data = times.map(() => ({
      time: '',
      date: todayDate,
      today: 0,
      yesterday: 0,
      lastWeek: 0
    }));

    // 랜덤으로 값을 생성하여 총합에 맞게 분배
    let remainingToday = todayTotal;
    let remainingYesterday = yesterdayTotal;
    let remainingLastWeek = lastWeekTotal;

    for (let i = 0; i < data.length; i++) {
      data[i].today = getRandomValue(0, remainingToday / (data.length - i));
      data[i].yesterday = getRandomValue(0, remainingYesterday / (data.length - i));
      data[i].lastWeek = getRandomValue(0, remainingLastWeek / (data.length - i));

      remainingToday -= data[i].today;
      remainingYesterday -= data[i].yesterday;
      remainingLastWeek -= data[i].lastWeek;
    }

    return data;
  };

  // 데이터 생성
  const followerData = generateRandomData(20, 20, 100);
  const visitorData = generateRandomData(50, 50, 250);
  const salesData = generateRandomData(100, 100, 500);

  // 오늘 총합 계산 함수
  const calculateTotal = (data) => data.reduce((total, point) => total + point.today, 0);

  // 각 총합 계산
  const totalFollowers = calculateTotal(followerData);
  const totalVisitors = calculateTotal(visitorData);
  const totalSales = calculateTotal(salesData);

  const getChartData = (data, label) => ({
    labels: data.map(point => point.time),
    datasets: [
      {
        label: '오늘',
        data: data.map(point => point.today),
        borderColor: '#0066FF',
        fill: false,
      },
      {
        label: '어제',
        data: data.map(point => point.yesterday),
        borderColor: '#888888',
        fill: false,
      },
      {
        label: '지난주',
        data: data.map(point => point.lastWeek),
        borderColor: '#28a745',
        fill: false,
      }
    ]
  });

  const options = {
    responsive: true,
  };

  return (
    <div style={{ flex: 1, padding: '20px', overflowY: 'auto'}}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '5px' }}>
            안녕하세요 <span style={{ color: '#0066FF' }}>이나민</span>님,
          </h1>
          <p style={{ color: '#666' }}>오늘의 대시보드입니다.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
          {[
            { title: '팔로우 수', value: `${totalFollowers}명`, icon: '👥' },
            { title: '방문자 수', value: `${totalVisitors}명`, icon: '🚶' },
            { title: '매출액', value: `${totalSales}만원`, icon: '💰' },
          ].map((metric, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ marginRight: '10px', fontSize: '24px' }}>{metric.icon}</span>
                <span style={{ color: '#666', fontSize: '14px' }}>{metric.title}</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{metric.value}</div>
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>팔로우 수 차트</h2>
          <Line data={getChartData(followerData, '팔로우 수')} options={options} />
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>방문자 수 차트</h2>
          <Line data={getChartData(visitorData, '방문자 수')} options={options} />
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px' }}>매출액 차트</h2>
          <Line data={getChartData(salesData, '매출액')} options={options} />
        </div>
      </div>
    </div>
  );  
};

export default MainContent;
