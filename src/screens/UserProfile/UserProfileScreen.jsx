import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UserProfileScreen.css";
import playIcon from "../../assets/images/play.png";
import heartIcon from "../../assets/images/heart.png";
import likeIcon from "../../assets/images/like.png";
import chevronLeftIcon from "../../assets/images/icons/chevron-left.svg";
import messageIcon from "../../assets/images/icons/message.svg";
import userPlusIcon from "../../assets/images/icons/user-plus.svg";
import userCheckIcon from "../../assets/images/icons/user-check.svg";
import videoIcon from "../../assets/images/icons/video.svg";
import heartFilledIcon from "../../assets/images/icons/heart-filled.svg";
import eyeIcon from "../../assets/images/icons/eye.svg";
import thumbsUpIcon from "../../assets/images/icons/thumbs-up.svg";

function UserProfileScreen() {
  const [profileUser, setProfileUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("videos");
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        // Get current logged in user
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);

        // Fetch profile user data
        const response = await fetch(
          `https://6808ab9a942707d722df227c.mockapi.io/users/${userId}`
        );

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        const profileData = await response.json();
        setProfileUser(profileData);

        // Set the user's liked videos
        setLikedVideos(profileData.likedVideos || []);

        // Check if current user is following the profile user
        if (
          parsedUser.following &&
          parsedUser.following.includes(profileData.id)
        ) {
          setIsFollowing(true);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
        // Show error or redirect
      }
    };

    fetchData();
  }, [userId, navigate]);

  const handleGoBack = () => {
    navigate("/home");
  };

  const handleFollow = async () => {
    if (!currentUser || !profileUser) return;

    try {
      // Clone the current user's data
      const updatedUser = { ...currentUser };

      // Initialize following array if it doesn't exist
      if (!updatedUser.following) {
        updatedUser.following = [];
      }

      if (isFollowing) {
        // Unfollow - remove from array
        updatedUser.following = updatedUser.following.filter(
          (id) => id !== profileUser.id
        );
      } else {
        // Follow - add to array
        updatedUser.following.push(profileUser.id);
      }

      // Update the following status in API
      const response = await fetch(
        `https://6808ab9a942707d722df227c.mockapi.io/users/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update follow status");
      }

      // Update local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update state
      setCurrentUser(updatedUser);
      setIsFollowing(!isFollowing);

      // Update follower count on profile user
      const updatedProfileUser = { ...profileUser };
      updatedProfileUser.followers = isFollowing
        ? Number(profileUser.followers) - 1
        : Number(profileUser.followers) + 1;

      // Update the profile user's follower count in API
      await fetch(
        `https://6808ab9a942707d722df227c.mockapi.io/users/${profileUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfileUser),
        }
      );

      setProfileUser(updatedProfileUser);
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };
  const handleMessage = () => {
    // Navigate to the message screen with this user
    navigate(`/messages/${profileUser.id}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Fallback default profile data if user is somehow null
  const profileData = profileUser || {
    username: "User not found",
    bio: "Profile unavailable",
    posts: 0,
    followers: 0,
    likes: 0,
    avatarUrl: "/src/assets/images/Avatar 78.jpg",
  };

  return (
    <div className="profile-container">
      {" "}
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <img
            src={chevronLeftIcon}
            alt="Back"
            className="icon-button svg-icon"
          />
        </button>
        <h2 className="profile-title">Profile</h2>
        <div className="spacer"></div>
      </div>
      {/* Profile Section */}
      <section className="profile-section">
        <div className="profile-header">
          <div className="profile-picture-container">
            <img
              src={profileData.avatarUrl || "/src/assets/images/Avatar 78.jpg"}
              alt="Profile"
              className="profile-picture"
            />
          </div>
          <h2 className="profile-name">{profileData.username}</h2>
          <p className="profile-bio">{profileData.bio}</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{profileData.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-number">{profileData.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-number">{profileData.likes}</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>{" "}
          <div className="profile-actions">
            <button
              className={`follow-button ${isFollowing ? "following" : ""}`}
              onClick={handleFollow}
            >
              <img
                src={isFollowing ? userCheckIcon : userPlusIcon}
                alt={isFollowing ? "Following" : "Follow"}
                className="button-icon svg-icon"
              />
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button className="message-button" onClick={handleMessage}>
              <img
                src={messageIcon}
                alt="Message"
                className="button-icon svg-icon"
              />
              Message
            </button>
          </div>
        </div>
      </section>
      {/* Video Section */}{" "}
      <section className="video-section">
        <div className="video-tabs">
          <button
            className={`video-tab ${activeTab === "videos" ? "active" : ""}`}
            onClick={() => handleTabChange("videos")}
          >
            <img src={videoIcon} alt="Videos" className="tab-icon svg-icon" />
            <span>Videos</span>
          </button>
          <button
            className={`video-tab ${activeTab === "liked" ? "active" : ""}`}
            onClick={() => handleTabChange("liked")}
          >
            <img
              src={heartFilledIcon}
              alt="Liked"
              className="tab-icon svg-icon"
            />
            <span>Liked</span>
          </button>
        </div>

        <div className="video-grid">
          {/* Sample videos */}{" "}
          {activeTab === "videos" ? (
            <>
              <div className="video-card">
                <img src="/src/assets/images/Image 285.jpg" alt="Video 1" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>1.5M</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>125K</span>
                  </div>
                </div>
              </div>

              <div className="video-card">
                <img src="/src/assets/images/Image 286.jpg" alt="Video 2" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>1.1M</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>89K</span>
                  </div>
                </div>
              </div>

              <div className="video-card">
                <img src="/src/assets/images/Image 287.jpg" alt="Video 3" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>2.2M</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>203K</span>
                  </div>
                </div>
              </div>
            </>
          ) : // Liked videos section
          likedVideos && likedVideos.length > 0 ? (
            likedVideos.map((video) => (
              <div className="video-card" key={video.id}>
                <img src={video.thumbnail} alt="Liked video" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>{formatViewCount(video.views || 0)}</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>{formatViewCount(video.likes || 0)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-likes-message">
              <img
                src={heartFilledIcon}
                alt="No liked videos"
                className="empty-icon svg-icon"
              />
              <p>No liked videos yet</p>
              <p className="empty-subtext">
                Videos liked by this user will appear here
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Helper function to format view counts (e.g., 1500000 -> 1.5M)
function formatViewCount(count) {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  } else {
    return count.toString();
  }
}

export default UserProfileScreen;
