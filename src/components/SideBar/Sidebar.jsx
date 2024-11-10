import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    birthdate: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    // userType에 따라 다른 페이지로 이동
    if (userType === 'owner') {
      navigate('/storeInfo');
    } else if (userType === 'customer') {
      navigate('/userboard');
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
    // 스타일 객체 그대로 유지
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
