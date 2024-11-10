import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [loginHover, setLoginHover] = useState(false);
  const [signupHover, setSignupHover] = useState(false);
  const navigate = useNavigate();

  // 유효성 검사 함수
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!validateEmail(email)) {
      setErrorMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await axios.post('http://43.201.2.61:3000/api/login', { email, password }, { withCredentials: true});
      if (response.status === 200) {
        const { redirectPath } = response.data;

        setErrorMessage('');
        navigate(redirectPath);
      } else {
        alert('일치하는 회원이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setErrorMessage('로그인에 실패했습니다.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#FFECB3',
        padding: '16px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
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
            <path
              d="M30 40 Q50 30 70 40 L65 70 Q50 80 35 70 Z"
              fill="#6F4E37"
              transform={isHovered ? 'translate(0, -5)' : ''}
            />
            <path
              d="M70 45 Q80 50 70 55"
              fill="none"
              stroke="#6F4E37"
              strokeWidth="3"
              transform={isHovered ? 'translate(0, -5)' : ''}
            />
            <path
              d="M45 30 Q50 20 55 30 T65 30"
              fill="none"
              stroke="#D2691E"
              strokeWidth="3"
              style={{
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.7s ease-in-out',
              }}
            />
            <ellipse
              cx="50"
              cy="55"
              rx="8"
              ry="12"
              fill="#4A2C2A"
              transform="rotate(-30, 50, 55)"
              style={{
                transformOrigin: 'center',
                transform: isHovered
                  ? 'rotate(-30deg) translate(0, -5px)'
                  : 'rotate(-30deg)',
              }}
            />
          </svg>
        </div>
        <h2
          style={{
            marginTop: '24px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Fav에 오신 것을 환영합니다
        </h2>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          계정에 로그인하거나 새 계정을 만드세요
        </p>

        <form style={{ marginTop: '32px' }} onSubmit={handleLogin}>
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="email" style={{ display: 'none' }}>
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              type="text"
              required
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '16px',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{ display: 'none' }}>
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                fontSize: '16px',
                backgroundColor: 'white',
                color: 'black',
              }}
            />
          </div>
          {errorMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>
          )}

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
            onClick={() => navigate('/signup')}
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
