import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterScreen.css'

function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    
    // Kiểm tra mật khẩu nhập lại
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!')
      return
    }

    try {
      setIsLoading(true)
      
      // Gửi yêu cầu đăng ký tới API
      const response = await fetch('https://6808ab9a942707d722df227c.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại')
      }
      
      // Đăng ký thành công, chuyển hướng đến trang home
      alert('Đăng ký thành công!')
      navigate('/home')
    } catch (error) {
      console.error('Lỗi đăng ký:', error)
      setError('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const goToLogin = () => {
    navigate('/')
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="heart-logo">
          <div className="heart"></div>
        </div>
        <p className="register-title">Create your account</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="register-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="login-link">
          <span>Already have an account?</span>
          <button className="login-button-link" onClick={goToLogin}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen