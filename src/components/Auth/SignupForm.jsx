import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignupForm() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    address: '',
    name: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: '',
    name: '',
    nickname: '',
    address: '',
  });

  // 유효성 검사 함수
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage((prev) => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
      return false;
    }
    setErrorMessage((prev) => ({ ...prev, email: '' }));
    return true;
  };

  const validatePassword = () => {
    if (formData.password.length < 6) {
      setErrorMessage((prev) => ({ ...prev, password: '비밀번호는 최소 6자 이상이어야 합니다.' }));
      return false;
    } else if (formData.password !== formData.passwordConfirm) {
      setErrorMessage((prev) => ({ ...prev, password: '비밀번호가 일치하지 않습니다.' }));
      return false;
    }
    setErrorMessage((prev) => ({ ...prev, password: '' }));
    return true;
  };

  const validateUserTypeFields = () => {
    let isValid = true;
    if (userType === 'boss') {
      if (!formData.name) {
        setErrorMessage((prev) => ({ ...prev, name: '이름을 입력해주세요.' }));
        isValid = false;
      } else {
        setErrorMessage((prev) => ({ ...prev, name: '' }));
      }
      if (!formData.address) {
        setErrorMessage((prev) => ({ ...prev, address: '주소를 입력해주세요.' }));
        isValid = false;
      } else {
        setErrorMessage((prev) => ({ ...prev, address: '' }));
      }
    } else if (userType === 'guest') {
      if (!formData.name) {
        setErrorMessage((prev) => ({ ...prev, name: '이름을 입력해주세요.' }));
        isValid = false;
      } else {
        setErrorMessage((prev) => ({ ...prev, name: '' }));
      }
      if (!formData.nickname) {
        setErrorMessage((prev) => ({ ...prev, nickname: '닉네임을 입력해주세요.' }));
        isValid = false;
      } else {
        setErrorMessage((prev) => ({ ...prev, nickname: '' }));
      }
    }
    return isValid;
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      address: '',
      name: '',
    }); // 모든 필드를 초기화
    setErrorMessage({ email: '', password: '', name: '', nickname: '', address: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword() && validateUserTypeFields()) {
      try {
        const endpoint = userType === 'boss' ? '/boss/signup' : '/guest/signup';

        await axios.post(`http://localhost:3000${endpoint}`, formData, { withCredentials: true});
        navigate('/');

      } catch (error) {
        console.log('회원가입 오류: ', error);
        setErrorMessage((prev) => ({ ...prev, genereal: '회원가입에 실패했습니다. 다시 시도해주세요.'}));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      padding: '20px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    wrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '40px',
    },
    cardHeader: {
      marginBottom: '30px',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#1a202c',
    },
    signupForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    label: {
      fontSize: '1rem',
      fontWeight: '500',
      color: '#4a5568',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #3F8FFF',
      borderRadius: '8px',
      fontSize: '1rem',
      color: 'black',
      backgroundColor: 'white',
      boxSizing: 'border-box',
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'left',
    },
    selectButton: {
      flex: '0 1 200px',
      padding: '12px',
      border: '1px solid #3F8FFF',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      color: '#3F8FFF',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s, color 0.2s',
    },
    selectButtonActive: {
      backgroundColor: '#3F8FFF',
      color: '#ffffff',
    },
    submitButton: {
      width: '100%',
      padding: '16px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: isHovered ? 'rgba(63, 143, 255, 0.9)' : '#3F8FFF',
      color: '#ffffff',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>회원가입</h2>
          </div>
          <form onSubmit={handleSubmit} style={styles.signupForm}>
            <div style={styles.formGroup}>
              <label style={styles.label}>선택하기</label>
              <div style={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('boss')}
                  style={{
                    ...styles.selectButton,
                    ...(userType === 'boss' ? styles.selectButtonActive : {}),
                  }}
                >
                  사장님
                </button>
                <button
                  type="button"
                  onClick={() => handleUserTypeChange('guest')}
                  style={{
                    ...styles.selectButton,
                    ...(userType === 'guest' ? styles.selectButtonActive : {}),
                  }}
                >
                  고객
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail}
                required
                style={styles.input}
              />
              {errorMessage.email && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage.email}</p>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword}
                required
                style={styles.input}
              />
              {errorMessage.password && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage.password}</p>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="passwordConfirm" style={styles.label}>
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.passwordConfirm}
                onChange={handleChange}
                onBlur={validatePassword}
                required
                style={styles.input}
              />
            </div>

            {userType === 'guest' && (
              <div style={styles.formGroup}>
                <label htmlFor="nickname" style={styles.label}>
                  닉네임
                </label>
                <input
                  id="nickname"
                  name="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                {errorMessage.nickname && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage.nickname}</p>}
              </div>
            )}

            {userType === 'boss' && (
              <div style={styles.formGroup}>
                <label htmlFor="address" style={styles.label}>
                  주소
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="주소를 입력해주세요"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
                {errorMessage.address && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage.address}</p>}
              </div>
            )}

            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="이름을 입력해주세요"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              {errorMessage.name && <p style={{ color: 'red', fontSize: '12px' }}>{errorMessage.name}</p>}
            </div>

            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={styles.submitButton}
            >
              등록하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
