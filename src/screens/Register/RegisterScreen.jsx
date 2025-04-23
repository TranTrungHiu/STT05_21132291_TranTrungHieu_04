import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterScreen.css'

function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  
  const navigate = useNavigate()

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatar(file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const uploadAvatar = async (file) => {
    // Create a FormData object to send the file to Cloudinary
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'ml_default') // Replace with your upload preset
    
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/du1ptfs4h/image/upload', // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      )
      
      const data = await response.json()
      if (data.secure_url) {
        return data.secure_url
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    
    // Kiểm tra mật khẩu nhập lại
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!')
      return
    }
    
    // Kiểm tra avatar
    if (!avatar) {
      setError('Vui lòng tải lên ảnh đại diện')
      return
    }

    try {
      setIsLoading(true)
      
      // Upload avatar to Cloudinary first
      const avatarUrl = await uploadAvatar(avatar)
      
      // Prepare user data including avatar URL
      const userData = {
        email,
        username,
        password,
        avatarUrl,
        bio: bio || "I love a colorful life ❤️❤️❤️", // Default bio if not provided
        posts: Math.floor(Math.random() * 500), // Random stats for demo
        followers: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 5000),
        likedVideos: [] // Initialize with empty array
      }
      
      // Gửi yêu cầu đăng ký tới API
      const response = await fetch('https://6808ab9a942707d722df227c.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Đăng ký thất bại')
      }
      
      // Store user data in localStorage for auto-login
      localStorage.setItem('user', JSON.stringify(data))
      
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
  
  const triggerFileInput = () => {
    fileInputRef.current.click()
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
          {/* Avatar upload section */}
          <div className="avatar-upload">
            <div 
              className="avatar-preview" 
              onClick={triggerFileInput}
              style={{ backgroundImage: previewUrl ? `url(${previewUrl})` : 'none' }}
            >
              {!previewUrl && <span>+</span>}
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="avatar-input"
            />
            <p className="avatar-label">Upload avatar</p>
          </div>
          
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
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          
          <div className="input-group">
            <textarea 
              placeholder="Bio (optional)" 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="2"
              className="bio-input"
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