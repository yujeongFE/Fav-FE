import React, { useState } from 'react';

export default function Login() {
  const [isHovered, setIsHovered] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#FFECB3',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        <div
          style={{
            width: '128px',
            height: '128px',
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            margin: '0 auto',
            transition: 'transform 0.3s ease-in-out',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
            <path d="M30 40 Q50 30 70 40 L65 70 Q50 80 35 70 Z" fill="#6F4E37" transform={isHovered ? "translate(0, -5)" : ""} />
            <path d="M70 45 Q80 50 70 55" fill="none" stroke="#6F4E37" strokeWidth="3" transform={isHovered ? "translate(0, -5)" : ""} />
            <path d="M45 30 Q50 20 55 30 T65 30" fill="none" stroke="#D2691E" strokeWidth="3" style={{ opacity: isHovered ? 1 : 0, transition: 'opacity 0.7s ease-in-out' }} />
            <ellipse cx="50" cy="55" rx="8" ry="12" fill="#4A2C2A" transform="rotate(-30, 50, 55)" style={{ transformOrigin: 'center', transform: isHovered ? "rotate(-30deg) translate(0, -5px)" : "rotate(-30deg)" }} />
          </svg>
        </div>
        <h2 style={{ marginTop: '24px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Fav에 오신 것을 환영합니다</h2>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>계정에 로그인하거나 새 계정을 만드세요</p>

        <form style={{ marginTop: '32px' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'none' }}>이메일 주소</label>
            <input
              id="email"
              name="email"
              type="text" // 이메일 입력 필드의 타입을 텍스트로 설정
              required
              placeholder="이메일 주소"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '16px',
                backgroundColor: 'white',
                color: 'black'
              }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{ display: 'none'  }}>비밀번호</label>
            <input
              id="password"
              name="password"
              type="password" // 비밀번호 입력 필드는 항상 비밀번호 타입으로 설정
              required
              placeholder="비밀번호"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '16px',
                backgroundColor: 'white',
                color: 'black'
              }}
            />
          </div>

          <button
            type="submit"
            onMouseEnter={() => setLoginHover(true)}
            onMouseLeave={() => setLoginHover(false)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loginHover ? '#357ACC' : '#3F8CFF',
              color: 'white',
              fontSize: '16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '8px',
              transition: 'background-color 0.3s ease',
            }}
          >
            로그인
          </button>
          <button
            type="button"
            onMouseEnter={() => setSignupHover(true)}
            onMouseLeave={() => setSignupHover(false)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: signupHover ? '#F5F0EB' : 'white',
              color: signupHover ? '#4A2C2A' : '#6F4E37',
              fontSize: '16px',
              borderRadius: '4px',
              border: '1px solid #6F4E37',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
