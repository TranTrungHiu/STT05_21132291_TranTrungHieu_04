import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeScreen.css'

function HomeScreen() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const userData = localStorage.getItem('user')
    if (!userData) {
      // Chưa đăng nhập, chuyển về trang đăng nhập
      navigate('/')
      return
    }

    setUser(JSON.parse(userData))
  }, [navigate])

  const handleLogout = () => {
    // Xóa thông tin người dùng và đăng xuất
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Dating App</h1>
        <div className="user-actions">
          <span>Welcome, {user.email}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="home-content">
        <h2>Welcome to your Dating App</h2>
        <p>You've successfully logged in to your account.</p>
        
        <div className="image-gallery">
          <h3>Suggested Matches</h3>
          <div className="image-grid">
            <div className="profile-card">
              <img src="/src/assets/images/Avatar 78.jpg" alt="Profile" />
              <div className="profile-info">
                <h4>Jessica, 25</h4>
                <p>5 miles away</p>
                <button className="like-button">Like</button>
              </div>
            </div>
            
            <div className="profile-card">
              <img src="/src/assets/images/Avatar 79.jpg" alt="Profile" />
              <div className="profile-info">
                <h4>Emma, 28</h4>
                <p>8 miles away</p>
                <button className="like-button">Like</button>
              </div>
            </div>
            
            <div className="profile-card">
              <img src="/src/assets/images/Avatar 80.jpg" alt="Profile" />
              <div className="profile-info">
                <h4>Sophia, 24</h4>
                <p>3 miles away</p>
                <button className="like-button">Like</button>
              </div>
            </div>
            
            <div className="profile-card">
              <img src="/src/assets/images/Avatar 81.jpg" alt="Profile" />
              <div className="profile-info">
                <h4>Anna, 26</h4>
                <p>7 miles away</p>
                <button className="like-button">Like</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeScreen