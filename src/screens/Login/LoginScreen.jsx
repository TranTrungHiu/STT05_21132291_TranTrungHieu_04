import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginScreen.css'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      setIsLoading(true)
      
      // Lấy danh sách người dùng từ API - using the correct API endpoint
      const response = await fetch('https://6808ab9a942707d722df227c.mockapi.io/users')
      
      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ')
      }
      
      const users = await response.json()
      
      // Kiểm tra thông tin đăng nhập
      const user = users.find(user => 
        (user.email === email || user.username === email) && user.password === password
      )
      
      if (user) {
        // Fetch liked videos if they exist
        if (!user.likedVideos) {
          user.likedVideos = []
        }
        
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(user))
        
        // Chuyển hướng đến trang home
        navigate('/home')
      } else {
        setError('Email/username hoặc mật khẩu không chính xác')
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error)
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const goToRegister = () => {
    navigate('/register')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="heart-logo">
          <div className="heart"></div>
        </div>
        <p className="login-title">Flirt and meet new people</p>
        
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Email or Username" 
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
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <a href="#" className="forgot-password">Forgot password?</a>
        
        <div className="create-account">
          <span>Don't have an account?</span>
          <button className="create-button" onClick={goToRegister}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen