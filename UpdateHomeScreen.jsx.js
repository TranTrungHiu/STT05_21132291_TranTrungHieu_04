// Script to update the HomeScreen.jsx file
const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'University', 'Nam04', 'LapTrinhDiDong', 
                           'STT05_21132291_TranTrungHieu_04', 'src', 
                           'screens', 'Home', 'HomeScreen.jsx');

let content = fs.readFileSync(filePath, 'utf8');

// Replace the follow button with icon
const oldFollowButton = /{user\?\\.following\?\\.includes\(suggestedUser\.id\)\s*\?\s*"Following"\s*:\s*"Follow"}/g;
const newFollowButton = `{user?.following?.includes(suggestedUser.id) ? (
                        <>
                          <img src={userPlusIcon} alt="Following" className="follow-icon checked" />
                          Following
                        </>
                      ) : (
                        <>
                          <img src={userPlusIcon} alt="Follow" className="follow-icon" />
                          Follow
                        </>
                      )}`;

content = content.replace(oldFollowButton, newFollowButton);

fs.writeFileSync(filePath, content, 'utf8');

console.log("HomeScreen.jsx updated successfully!");
