import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MainContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const followerData = [
    { time: '10:00 AM', date: '10/11', today: 300, yesterday: 280, lastWeek: 250 },
    { time: '12:00 PM', date: '10/11', today: 320, yesterday: 290, lastWeek: 260 },
    { time: '02:00 PM', date: '10/11', today: 350, yesterday: 300, lastWeek: 270 },
    { time: '04:00 PM', date: '10/11', today: 370, yesterday: 310, lastWeek: 280 },
    { time: '06:00 PM', date: '10/11', today: 400, yesterday: 330, lastWeek: 300 },
    { time: '08:00 PM', date: '10/11', today: 420, yesterday: 350, lastWeek: 310 },
    { time: '10:00 PM', date: '10/11', today: 450, yesterday: 370, lastWeek: 330 },
  ];

  const visitorData = [
    { time: '10:00 AM', date: '10/11', today: 50, yesterday: 40, lastWeek: 35 },
    { time: '12:00 PM', date: '10/11', today: 70, yesterday: 60, lastWeek: 55 },
    { time: '02:00 PM', date: '10/11', today: 90, yesterday: 80, lastWeek: 75 },
    { time: '04:00 PM', date: '10/11', today: 100, yesterday: 90, lastWeek: 85 },
    { time: '06:00 PM', date: '10/11', today: 110, yesterday: 95, lastWeek: 90 },
    { time: '08:00 PM', date: '10/11', today: 120, yesterday: 100, lastWeek: 95 },
    { time: '10:00 PM', date: '10/11', today: 130, yesterday: 110, lastWeek: 105 },
  ];

  const salesData = [
    { time: '10:00 AM', date: '10/11', today: 150000, yesterday: 140000, lastWeek: 135000 },
    { time: '12:00 PM', date: '10/11', today: 200000, yesterday: 180000, lastWeek: 175000 },
    { time: '02:00 PM', date: '10/11', today: 250000, yesterday: 220000, lastWeek: 215000 },
    { time: '04:00 PM', date: '10/11', today: 300000, yesterday: 270000, lastWeek: 260000 },
    { time: '06:00 PM', date: '10/11', today: 320000, yesterday: 300000, lastWeek: 295000 },
    { time: '08:00 PM', date: '10/11', today: 350000, yesterday: 330000, lastWeek: 325000 },
    { time: '10:00 PM', date: '10/11', today: 380000, yesterday: 360000, lastWeek: 350000 },
  ];

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
            { title: '팔로우 수', value: '450명', icon: '👥' },
            { title: '방문자 수', value: '130명', icon: '🚶' },
            { title: '매출액', value: '380만원', icon: '💰' },
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
