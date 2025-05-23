import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeScreen.css";
import bellIcon from "../../assets/images/icons/bell.svg";
import chevronLeftIcon from "../../assets/images/icons/chevron-left.svg";
import moreIcon from "../../assets/images/icons/more-vertical.svg";
import editIcon from "../../assets/images/icons/edit.svg";
import messageIcon from "../../assets/images/icons/message.svg";
import userPlusIcon from "../../assets/images/icons/user-plus.svg";
import videoIcon from "../../assets/images/icons/video.svg";
import heartIcon from "../../assets/images/icons/heart.svg";
import heartFilledIcon from "../../assets/images/icons/heart-filled.svg";
import eyeIcon from "../../assets/images/icons/eye.svg";
import thumbsUpIcon from "../../assets/images/icons/thumbs-up.svg";

function HomeScreen() {
  const [user, setUser] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [loading, setLoading] = useState(true);
  const [showMoreSuggested, setShowMoreSuggested] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const userData = localStorage.getItem("user");
    if (!userData) {
      // Chưa đăng nhập, chuyển về trang đăng nhập
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const parsedUser = JSON.parse(userData);
        console.log("Parsed user data:", parsedUser);

        // Make sure likedVideos is initialized
        if (!parsedUser.likedVideos) {
          parsedUser.likedVideos = [];
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }

        setUser(parsedUser);

        // Fetch suggested users from mock API
        const suggestedResponse = await fetch(
          "https://6808ab9a942707d722df227c.mockapi.io/users"
        );

        if (!suggestedResponse.ok) {
          throw new Error(`API returned ${suggestedResponse.status}`);
        }

        const suggestedData = await suggestedResponse.json();
        console.log("Suggested users:", suggestedData);

        // Filter out the current user
        const filteredSuggestions = suggestedData.filter(
          (u) => u.id !== parsedUser.id
        );
        setSuggestedUsers(filteredSuggestions);

        // Set liked videos
        setLikedVideos(parsedUser.likedVideos || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Even if there's an error fetching suggested users,
        // still show the current user's data
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    // Xóa thông tin người dùng và đăng xuất
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleFollow = async (userId) => {
    if (!user) return;

    try {
      // Find the user to follow
      const userToFollow = suggestedUsers.find((u) => u.id === userId);
      if (!userToFollow) return;

      // Clone the current user's data
      const updatedUser = { ...user };

      // Initialize following array if it doesn't exist
      if (!updatedUser.following) {
        updatedUser.following = [];
      }

      // Check if already following
      const isFollowing = updatedUser.following.includes(userId);

      if (isFollowing) {
        // Unfollow - remove from array
        updatedUser.following = updatedUser.following.filter(
          (id) => id !== userId
        );
      } else {
        // Follow - add to array
        updatedUser.following.push(userId);
      }

      // Update the following status in API
      const response = await fetch(
        `https://6808ab9a942707d722df227c.mockapi.io/users/${user.id}`,
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
      setUser(updatedUser);

      // Update UI for suggested users
      setSuggestedUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, isFollowing: !isFollowing } : u
        )
      );
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleGoBack = () => {
    // Not navigating anywhere since this is the home page
    console.log("Home page");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };
  const handleMessage = (userId) => {
    // Navigate to the message screen with this user
    navigate(`/messages/${userId}`);
  };

  const handleLikeVideo = async (video) => {
    if (!user) return;

    try {
      // Clone the current user's data
      const updatedUser = { ...user };

      // Initialize likedVideos array if it doesn't exist
      if (!updatedUser.likedVideos) {
        updatedUser.likedVideos = [];
      }

      // Check if already liked
      const videoIndex = updatedUser.likedVideos.findIndex(
        (v) => v.id === video.id
      );

      if (videoIndex >= 0) {
        // Unlike - remove from array
        updatedUser.likedVideos = updatedUser.likedVideos.filter(
          (v) => v.id !== video.id
        );
      } else {
        // Like - add to array
        updatedUser.likedVideos.push(video);
      }

      // Update the likes status in API
      const response = await fetch(
        `https://6808ab9a942707d722df227c.mockapi.io/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      // Update local storage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Update state
      setUser(updatedUser);
      setLikedVideos(updatedUser.likedVideos);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };
  // Helper function to render follow button with proper UI
  const renderFollowButton = (isFollowing) => {
    return isFollowing ? (
      <>
        <img
          src={userPlusIcon}
          alt="Following"
          className="follow-icon checked svg-icon"
        />
        Following
      </>
    ) : (
      <>
        <img src={userPlusIcon} alt="Follow" className="follow-icon svg-icon" />
        Follow
      </>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Fallback default user data if user is somehow null
  const userData = user || {
    username: "Kiran Glaucus",
    bio: "I love a colorful life ❤️❤️❤️",
    posts: 253,
    followers: 628,
    likes: 2534,
    avatarUrl: "/src/assets/images/Avatar 78.jpg",
  };
  return (
    <div className="home-container">
      {" "}
      <div className="header">
        <button className="back-button" onClick={handleGoBack}>
          <img
            src={chevronLeftIcon}
            alt="Back"
            className="icon-button svg-icon"
          />
        </button>
        <div className="header-actions">
          <button className="notification-button">
            <img
              src={bellIcon}
              alt="Notifications"
              className="icon-button svg-icon"
            />
          </button>
          <button className="more-button" onClick={handleLogout}>
            <img src={moreIcon} alt="More" className="icon-button svg-icon" />
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
            {/* For the logged-in user, show Edit Profile button */}
            <button className="edit-profile-button" onClick={handleEditProfile}>
              <img src={editIcon} alt="Edit" className="button-icon" />
              Edit Profile
            </button>
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
                {suggestedUsers.slice(0, 4).map((suggestedUser) => (
                  <div className="account" key={suggestedUser.id}>
                    <button className="close-button">×</button>
                    <div
                      className="account-picture-container"
                      onClick={() => handleViewProfile(suggestedUser.id)}
                    >
                      <img
                        src={
                          suggestedUser.avatarUrl ||
                          "/src/assets/images/Avatar 79.jpg"
                        }
                        alt={suggestedUser.username}
                        className="account-picture"
                      />
                    </div>
                    <p
                      className="account-name"
                      onClick={() => handleViewProfile(suggestedUser.id)}
                    >
                      {suggestedUser.username || "User"}
                    </p>
                    <button
                      className={`follow-button small ${
                        user?.following?.includes(suggestedUser.id)
                          ? "following"
                          : ""
                      }`}
                      onClick={() => handleFollow(suggestedUser.id)}
                    >
                      {renderFollowButton(
                        user?.following?.includes(suggestedUser.id)
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Second row - visible when "View more" is clicked */}
              {showMoreSuggested && suggestedUsers.length > 4 && (
                <div className="suggested-accounts-row">
                  {suggestedUsers.slice(4, 8).map((suggestedUser) => (
                    <div className="account" key={suggestedUser.id}>
                      <button className="close-button">×</button>
                      <div
                        className="account-picture-container"
                        onClick={() => handleViewProfile(suggestedUser.id)}
                      >
                        <img
                          src={
                            suggestedUser.avatarUrl ||
                            "/src/assets/images/Avatar 80.jpg"
                          }
                          alt={suggestedUser.username}
                          className="account-picture"
                        />
                      </div>
                      <p
                        className="account-name"
                        onClick={() => handleViewProfile(suggestedUser.id)}
                      >
                        {suggestedUser.username || "User"}
                      </p>
                      <button
                        className={`follow-button small ${
                          user?.following?.includes(suggestedUser.id)
                            ? "following"
                            : ""
                        }`}
                        onClick={() => handleFollow(suggestedUser.id)}
                      >
                        {renderFollowButton(
                          user?.following?.includes(suggestedUser.id)
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            // Fallback suggested users if API fails
            <div className="suggested-accounts-row">
              {" "}
              <div className="account">
                <button className="close-button">×</button>
                <div
                  className="account-picture-container"
                  onClick={() => alert("View Fiora's profile")}
                >
                  <img
                    src="/src/assets/images/Avatar 79.jpg"
                    alt="Fiora"
                    className="account-picture"
                  />
                </div>{" "}
                <p
                  className="account-name"
                  onClick={() => alert("View Fiora's profile")}
                >
                  Fiora
                </p>
                <button className="follow-button small">
                  <img
                    src={userPlusIcon}
                    alt="Follow"
                    className="follow-icon svg-icon"
                  />
                  Follow
                </button>
              </div>
              <div className="account">
                <button className="close-button">×</button>
                <div
                  className="account-picture-container"
                  onClick={() => alert("View Robb's profile")}
                >
                  <img
                    src="/src/assets/images/Avatar 80.jpg"
                    alt="Robb"
                    className="account-picture"
                  />
                </div>{" "}
                <p
                  className="account-name"
                  onClick={() => alert("View Robb's profile")}
                >
                  Robb
                </p>
                <button className="follow-button small">
                  <img
                    src={userPlusIcon}
                    alt="Follow"
                    className="follow-icon svg-icon"
                  />
                  Follow
                </button>
              </div>
              <div className="account">
                <button className="close-button">×</button>
                <div
                  className="account-picture-container"
                  onClick={() => alert("View Kolby's profile")}
                >
                  <img
                    src="/src/assets/images/Avatar 81.jpg"
                    alt="Kolby"
                    className="account-picture"
                  />
                </div>{" "}
                <p
                  className="account-name"
                  onClick={() => alert("View Kolby's profile")}
                >
                  Kolby
                </p>
                <button className="follow-button small">
                  <img
                    src={userPlusIcon}
                    alt="Follow"
                    className="follow-icon svg-icon"
                  />
                  Follow
                </button>
              </div>
            </div>
          )}
        </div>
      </section>{" "}
      {/* Section 3: Video-Like Section */}
      <section className="video-section">
        {" "}
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
          {activeTab === "videos" ? (
            // All videos section
            <>
              <div className="video-card">
                <img src="/src/assets/images/Image 285.jpg" alt="Video 1" />{" "}
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
                </div>{" "}
                <button
                  className="like-button"
                  onClick={() =>
                    handleLikeVideo({
                      id: "v1",
                      thumbnail: "/src/assets/images/Image 285.jpg",
                      views: 1500000,
                      likes: 125000,
                    })
                  }
                >
                  {" "}
                  <img
                    src={
                      user?.likedVideos?.some((v) => v.id === "v1")
                        ? heartFilledIcon
                        : heartIcon
                    }
                    alt="Like"
                    className="like-button-icon svg-icon"
                  />
                </button>
              </div>{" "}
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
                <button
                  className="like-button"
                  onClick={() =>
                    handleLikeVideo({
                      id: "v2",
                      thumbnail: "/src/assets/images/Image 286.jpg",
                      views: 1100000,
                      likes: 89000,
                    })
                  }
                >
                  {" "}
                  <img
                    src={
                      user?.likedVideos?.some((v) => v.id === "v2")
                        ? heartFilledIcon
                        : heartIcon
                    }
                    alt="Like"
                    className="like-button-icon svg-icon"
                  />
                </button>
              </div>{" "}
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
                <button
                  className="like-button"
                  onClick={() =>
                    handleLikeVideo({
                      id: "v3",
                      thumbnail: "/src/assets/images/Image 287.jpg",
                      views: 2200000,
                      likes: 203000,
                    })
                  }
                >
                  {" "}
                  <img
                    src={
                      user?.likedVideos?.some((v) => v.id === "v3")
                        ? heartFilledIcon
                        : heartIcon
                    }
                    alt="Like"
                    className="like-button-icon svg-icon"
                  />
                </button>
              </div>{" "}
              <div className="video-card">
                <img src="/src/assets/images/Image 288.jpg" alt="Video 4" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>514K</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>42K</span>
                  </div>
                </div>
                <button
                  className="like-button"
                  onClick={() =>
                    handleLikeVideo({
                      id: "v4",
                      thumbnail: "/src/assets/images/Image 288.jpg",
                      views: 514000,
                      likes: 42000,
                    })
                  }
                >
                  {" "}
                  <img
                    src={
                      user?.likedVideos?.some((v) => v.id === "v4")
                        ? heartFilledIcon
                        : heartIcon
                    }
                    alt="Like"
                    className="like-button-icon svg-icon"
                  />
                </button>
              </div>{" "}
              <div className="video-card">
                <img src="/src/assets/images/Image 289.jpg" alt="Video 5" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>1.3M</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>111K</span>
                  </div>
                </div>
                <button
                  className="like-button"
                  onClick={() =>
                    handleLikeVideo({
                      id: "v5",
                      thumbnail: "/src/assets/images/Image 289.jpg",
                      views: 1300000,
                      likes: 111000,
                    })
                  }
                >
                  {" "}
                  <img
                    src={
                      user?.likedVideos?.some((v) => v.id === "v5")
                        ? heartFilledIcon
                        : heartIcon
                    }
                    alt="Like"
                    className="like-button-icon svg-icon"
                  />
                </button>
              </div>{" "}
              <div className="video-card">
                <img src="/src/assets/images/Image 290.jpg" alt="Video 6" />
                <div className="video-meta">
                  <div className="video-views">
                    <img
                      src={eyeIcon}
                      alt="Views"
                      className="meta-icon svg-icon"
                    />
                    <span>3.1M</span>
                  </div>
                  <div className="video-likes">
                    <img
                      src={thumbsUpIcon}
                      alt="Likes"
                      className="meta-icon svg-icon"
                    />
                    <span>267K</span>
                  </div>
                </div>
                <button
                  className="like-button"
                  onClick={() =>
                    handleLikeVideo({
                      id: "v6",
                      thumbnail: "/src/assets/images/Image 290.jpg",
                      views: 3100000,
                      likes: 267000,
                    })
                  }
                >
                  {" "}
                  <img
                    src={
                      user?.likedVideos?.some((v) => v.id === "v6")
                        ? heartFilledIcon
                        : heartIcon
                    }
                    alt="Like"
                    className="like-button-icon svg-icon"
                  />
                </button>
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
                <button
                  className="like-button active"
                  onClick={() => handleLikeVideo(video)}
                >
                  <img
                    src={heartFilledIcon}
                    alt="Unlike"
                    className="like-button-icon svg-icon"
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="empty-likes-message">
              <img
                src={heartIcon}
                alt="No liked videos"
                className="empty-icon svg-icon"
              />
              <p>No liked videos yet</p>
              <p className="empty-subtext">Videos you like will appear here</p>
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

export default HomeScreen;
