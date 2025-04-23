import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomeScreen.css'
import bellIcon from '../../assets/images/bell.png'
import playIcon from '../../assets/images/play.png'
import heartIcon from '../../assets/images/heart.png'
import likeIcon from '../../assets/images/like.png'

function HomeScreen() {
  const [user, setUser] = useState(null)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const [likedVideos, setLikedVideos] = useState([])
  const [activeTab, setActiveTab] = useState('videos')
  const [loading, setLoading] = useState(true)
  const [showMoreSuggested, setShowMoreSuggested] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const userData = localStorage.getItem('user')
    if (!userData) {
      // Chưa đăng nhập, chuyển về trang đăng nhập
      navigate('/')
      return
    }

    const fetchUserData = async () => {
      try {
        const parsedUser = JSON.parse(userData)
        console.log("Parsed user data:", parsedUser)
        setUser(parsedUser)
        
        // Fetch suggested users from mock API
        const suggestedResponse = await fetch('https://6808ab9a942707d722df227c.mockapi.io/users')
        
        if (!suggestedResponse.ok) {
          throw new Error(`API returned ${suggestedResponse.status}`)
        }
        
        const suggestedData = await suggestedResponse.json()
        console.log("Suggested users:", suggestedData)
        
        // Filter out the current user
        const filteredSuggestions = suggestedData.filter(u => u.id !== parsedUser.id)
        setSuggestedUsers(filteredSuggestions)
        
        // Fetch liked videos for the user
        if (parsedUser.likedVideos && parsedUser.likedVideos.length > 0) {
          setLikedVideos(parsedUser.likedVideos)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        // Even if there's an error fetching suggested users,
        // still show the current user's data
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  const handleLogout = () => {
    // Xóa thông tin người dùng và đăng xuất
    localStorage.removeItem('user')
    navigate('/')
  }
  
  const handleFollow = async (userId) => {
    // In a real app, we would update the follow status in the backend
    // For now, we'll just update the UI
    setSuggestedUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userId 
          ? {...u, isFollowing: !u.isFollowing} 
          : u
      )
    )
  }
  
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  
  const handleGoBack = () => {
    // In a real app, this would navigate back
    console.log('Go back')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  // Fallback default user data if user is somehow null
  const userData = user || {
    username: "Kiran Glaucus",
    bio: "I love a colorful life ❤️❤️❤️",
    posts: 253,
    followers: 628,
    likes: 2534,
    avatarUrl: "/src/assets/images/Avatar 78.jpg"
  };

  return (
    <div className="home-container">    
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <span>&lt;</span>
        </button>
        <div className="header-actions">
          <button className="notification-button">
            <img src={bellIcon} alt="Notifications" />
          </button>
          <button className="more-button" onClick={handleLogout}>
            <span>⋮</span>
          </button>
        </div>
      </div>
      
      {/* Section 1: User Profile */}
      <section className="profile-section">
        <div className="profile-header">
          <div className="profile-picture-container">
            <img 
              src={userData.avatarUrl || "/src/assets/images/Avatar 78.jpg"} 
              alt="Profile" 
              className="profile-picture" 
            />
          </div>
          <h2 className="profile-name">{userData.username}</h2>
          <p className="profile-bio">{userData.bio}</p>
          
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{userData.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{userData.likes}</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="follow-button">Follow</button>
            <button className="message-button">Message</button>
          </div>
        </div>
      </section>

      {/* Section 2: Suggested Accounts */}
      <section className="suggested-section">
        <div className="section-header">
          <h3>Suggested accounts</h3>
          <button 
            className="view-more-button" 
            onClick={() => setShowMoreSuggested(!showMoreSuggested)}
          >
            {showMoreSuggested ? "Show less" : "View more"}
          </button>
        </div>
        
        <div className="suggested-accounts">
          {suggestedUsers && suggestedUsers.length > 0 ? (
            <>
              {/* First row - always visible */}
              <div className="suggested-accounts-row">
                {suggestedUsers
                  .slice(0, 4)
                  .map((suggestedUser) => (
                    <div className="account" key={suggestedUser.id}>
                      <button className="close-button">×</button>
                      <div className="account-picture-container">
                        <img 
                          src={suggestedUser.avatarUrl || "/src/assets/images/Avatar 79.jpg"} 
                          alt={suggestedUser.username} 
                          className="account-picture" 
                        />
                      </div>
                      <p className="account-name">{suggestedUser.username || "User"}</p>
                      <button 
                        className="follow-button small"
                        onClick={() => handleFollow(suggestedUser.id)}
                      >
                        Follow
                      </button>
                    </div>
                  ))}
              </div>
              
              {/* Second row - visible when "View more" is clicked */}
              {showMoreSuggested && suggestedUsers.length > 4 && (
                <div className="suggested-accounts-row">
                  {suggestedUsers
                    .slice(4, 8)
                    .map((suggestedUser) => (
                      <div className="account" key={suggestedUser.id}>
                        <button className="close-button">×</button>
                        <div className="account-picture-container">
                          <img 
                            src={suggestedUser.avatarUrl || "/src/assets/images/Avatar 80.jpg"} 
                            alt={suggestedUser.username} 
                            className="account-picture" 
                          />
                        </div>
                        <p className="account-name">{suggestedUser.username || "User"}</p>
                        <button 
                          className="follow-button small"
                          onClick={() => handleFollow(suggestedUser.id)}
                        >
                          Follow
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </>
          ) : (
            // Fallback suggested users if API fails
            <div className="suggested-accounts-row">
              <div className="account">
                <button className="close-button">×</button>
                <div className="account-picture-container">
                  <img src="/src/assets/images/Avatar 79.jpg" alt="Fiora" className="account-picture" />
                </div>
                <p className="account-name">Fiora</p>
                <button className="follow-button small">Follow</button>
              </div>
              
              <div className="account">
                <button className="close-button">×</button>
                <div className="account-picture-container">
                  <img src="/src/assets/images/Avatar 80.jpg" alt="Robb" className="account-picture" />
                </div>
                <p className="account-name">Robb</p>
                <button className="follow-button small">Follow</button>
              </div>
              
              <div className="account">
                <button className="close-button">×</button>
                <div className="account-picture-container">
                  <img src="/src/assets/images/Avatar 81.jpg" alt="Kolby" className="account-picture" />
                </div>
                <p className="account-name">Kolby</p>
                <button className="follow-button small">Follow</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Video-Like Section */}
      <section className="video-section">
        <div className="video-tabs">
          <button 
            className={`video-tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => handleTabChange('videos')}
          >
            <img src={playIcon} alt="Videos" className="tab-icon" />
            <span>Videos</span>
          </button>
          <button 
            className={`video-tab ${activeTab === 'liked' ? 'active' : ''}`}
            onClick={() => handleTabChange('liked')}
          >
            <img src={heartIcon} alt="Liked" className="tab-icon" />
            <span>Liked</span>
          </button>
        </div>
        
        <div className="video-grid">
          {likedVideos && likedVideos.length > 0 ? (
            likedVideos.map((video, index) => (
              <div className="video-card" key={index}>
                <img src={video.thumbnail} alt={`Video ${index + 1}`} />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>{formatViewCount(video.views || 0)}</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>{formatViewCount(video.likes || 0)}</p>
                </div>
              </div>
            ))
          ) : (
            // Sample videos if user doesn't have liked videos
            <>
              <div className="video-card">
                <img src="/src/assets/images/Image 285.jpg" alt="Video 1" />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>1.5M</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>125K</p>
                </div>
              </div>
              
              <div className="video-card">
                <img src="/src/assets/images/Image 286.jpg" alt="Video 2" />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>1.1M</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>89K</p>
                </div>
              </div>
              
              <div className="video-card">
                <img src="/src/assets/images/Image 287.jpg" alt="Video 3" />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>2.2M</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>203K</p>
                </div>
              </div>
              
              <div className="video-card">
                <img src="/src/assets/images/Image 288.jpg" alt="Video 4" />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>514K</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>42K</p>
                </div>
              </div>
              
              <div className="video-card">
                <img src="/src/assets/images/Image 289.jpg" alt="Video 5" />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>1.3M</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>111K</p>
                </div>
              </div>
              
              <div className="video-card">
                <img src="/src/assets/images/Image 290.jpg" alt="Video 6" />
                <div className="video-views">
                  <img src={playIcon} alt="Play" className="play-icon" />
                  <p>3.1M</p>
                </div>
                <div className="video-likes">
                  <img src={likeIcon} alt="Likes" className="like-icon" />
                  <p>267K</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

// Helper function to format view counts (e.g., 1500000 -> 1.5M)
function formatViewCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  } else {
    return count.toString()
  }
}

export default HomeScreen