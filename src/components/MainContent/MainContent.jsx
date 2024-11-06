import React from "react";
import { useState, useEffect } from "react";

const MainContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

    const data = [
        { time: '10:23 PM', date: '10/11', today: 5, yesterday: 3, lastWeek: 4 },
        { time: '10:30 PM', date: '10/11', today: 10, yesterday: 7, lastWeek: 8 },
        { time: '10:40 PM', date: '10/11', today: 25, yesterday: 20, lastWeek: 22 },
        { time: '10:50 PM', date: '10/11', today: 23, yesterday: 25, lastWeek: 24 },
        { time: '11:00 PM', date: '10/11', today: 20, yesterday: 22, lastWeek: 21 },
        { time: '11:10 PM', date: '10/11', today: 18, yesterday: 20, lastWeek: 19 },
        { time: '11:20 PM', date: '10/11', today: 15, yesterday: 18, lastWeek: 17 },
        { time: '11:30 PM', date: '10/11', today: 12, yesterday: 15, lastWeek: 14 },
        { time: '11:40 PM', date: '10/11', today: 8, yesterday: 10, lastWeek: 9 },
      ];
    
      useEffect(() => {
        drawChart();
        window.addEventListener('resize', drawChart);
        return () => window.removeEventListener('resize', drawChart);
      }, [selectedPeriod]);
    
      const drawChart = () => {
        const canvas = document.getElementById('visitorChart');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const { width } = canvas.getBoundingClientRect();
          const height = 400;
          const padding = 40;
          const chartWidth = width - 2 * padding;
          const chartHeight = height - 2 * padding;
    
          canvas.width = width;
          canvas.height = height;
    
          ctx.clearRect(0, 0, width, height);
    
          ctx.beginPath();
          ctx.moveTo(padding, padding);
          ctx.lineTo(padding, height - padding);
          ctx.lineTo(width - padding, height - padding);
          ctx.stroke();
    
          const maxValue = Math.max(...data.map(d => Math.max(d.today, d.yesterday, d.lastWeek)));
          const scaleY = chartHeight / maxValue;
          const scaleX = chartWidth / (data.length - 1);
    
          ['today', 'yesterday', 'lastWeek'].forEach((key, index) => {
            ctx.beginPath();
            ctx.strokeStyle = ['#0066FF', '#888888', '#28a745'][index];
            data.forEach((point, i) => {
              const x = padding + i * scaleX;
              const y = height - padding - point[key] * scaleY;
              if (i === 0) {
                ctx.moveTo(x, y);
              } else {
                ctx.lineTo(x, y);
              }
            });
            ctx.stroke();
          });
    
          ctx.fillStyle = '#888888';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          data.forEach((point, i) => {
            const x = padding + i * scaleX;
            ctx.fillText(point.time, x, height - padding + 15);
            ctx.fillText(point.date, x, height - padding + 30);
          });
    
          ctx.textAlign = 'right';
          for (let i = 0; i <= maxValue; i += 5) {
            const y = height - padding - i * scaleY;
            ctx.fillText(i.toString(), padding - 5, y);
          }
        }
      };

  return (
    <div style={{ flex: 1, padding: '20px', overflowY: 'auto'}}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '5px' }}>
              안녕하세요 <span style={{ color: '#0066FF' }}>이나민</span>님,
            </h1>
            <p style={{ color: '#666' }}>오늘의 대시보드입니다.</p>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
            {[
              { title: '좋아요 수', value: '350명', icon: '👥' },
              { title: '방문자 수', value: '450명', icon: '🚶' },
              { title: '매출액', value: '3500만원', icon: '💰' },
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

          {/* Chart */}
          <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '18px', margin: 0 }}>방문자 차트</h2>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{
                  padding: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '14px'
                }}
              >
                <option value="today">오늘</option>
                <option value="yesterday">어제</option>
                <option value="lastWeek">지난주</option>
              </select>
            </div>
            <canvas 
              id="visitorChart" 
              style={{ width: '100%', height: '400px' }}
            ></canvas>
          </div>
        </div>
      </div>
  );
};

export default MainContent;