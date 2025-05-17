import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MessageScreen.css";
import chevronLeftIcon from "../../assets/images/icons/chevron-left.svg";

function MessageScreen() {
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

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

        // Fetch the other user data
        const response = await fetch(
          `https://6808ab9a942707d722df227c.mockapi.io/users/${userId}`
        );

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const otherUserData = await response.json();
        setOtherUser(otherUserData);

        // In a real app, we would fetch conversation history here
        // For demo purposes, let's create some sample messages
        setMessages([
          {
            id: 1,
            senderId: parsedUser.id,
            text: "Hello there! How are you doing?",
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          },
          {
            id: 2,
            senderId: userId,
            text: "Hi! I'm good, thanks for asking. How about you?",
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          },
          {
            id: 3,
            senderId: parsedUser.id,
            text: "I'm doing great! Just wanted to check in.",
            timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
          },
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching message data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    // Add new message to the list
    const newMsg = {
      id: Date.now(),
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // In a real app, this would send the message to the backend
    // For this demo, we're just updating the UI
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  // Group messages by date
  const messagesByDate = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="message-container">
      <div className="message-header">
        <button className="back-button" onClick={handleGoBack}>
          <span>←</span>
        </button>
        <div className="message-user-info">
          <div className="message-user-picture">
            <img
              src={otherUser?.avatarUrl || "/src/assets/images/Avatar 79.jpg"}
              alt={otherUser?.username}
            />
          </div>
          <div className="message-user-name">
            <h3>{otherUser?.username || "User"}</h3>
            <p className="online-status">Online</p>
          </div>
        </div>
        <div className="message-actions">
          <button className="call-button">📞</button>
          <button className="video-button">📹</button>
        </div>
      </div>

      <div className="message-content">
        {Object.entries(messagesByDate).map(([date, dateMessages]) => (
          <div key={date} className="message-date-group">
            <div className="message-date-divider">
              <span>{formatMessageDate(dateMessages[0].timestamp)}</span>
            </div>

            {dateMessages.map((message) => (
              <div
                key={message.id}
                className={`message-bubble ${
                  message.senderId === currentUser.id ? "sent" : "received"
                }`}
              >
                <p className="message-text">{message.text}</p>
                <span className="message-time">
                  {formatMessageTime(message.timestamp)}
                </span>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <div className="message-input-container">
          <button type="button" className="emoji-button">
            😊
          </button>
          <input
            type="text"
            placeholder="Message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <button type="button" className="attachment-button">
            📎
          </button>
        </div>
        <button
          type="submit"
          className="send-button"
          disabled={!newMessage.trim()}
        >
          📤
        </button>
      </form>
    </div>
  );
}

export default MessageScreen;
