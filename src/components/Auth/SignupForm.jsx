import React, { useState } from 'react';

export default function SignupForm() {
  const [userType, setUserType] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    address: '',
    name: '',
    birthdate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
                  onClick={() => setUserType('owner')}
                  style={{
                    ...styles.selectButton,
                    ...(userType === 'owner' ? styles.selectButtonActive : {}),
                  }}
                >
                  사장님
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('customer')}
                  style={{
                    ...styles.selectButton,
                    ...(userType === 'customer' ? styles.selectButtonActive : {}),
                  }}
                >
                  고객
                </button>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="passwordConfirm" style={styles.label}>비밀번호 확인</label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            {userType === 'customer' && (
              <div style={styles.formGroup}>
                <label htmlFor="nickname" style={styles.label}>닉네임</label>
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
              </div>
            )}

            {userType === 'owner' && (
              <div style={styles.formGroup}>
                <label htmlFor="address" style={styles.label}>주소</label>
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
              </div>
            )}

            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>이름</label>
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
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="birthdate" style={styles.label}>생년월일</label>
              <input
                id="birthdate"
                name="birthdate"
                type="text"
                placeholder="생년월일 8자리"
                value={formData.birthdate}
                onChange={handleChange}
                required
                style={styles.input}
              />
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