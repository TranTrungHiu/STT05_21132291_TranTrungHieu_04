const fs = require('fs');
const path = require('path');
const filePath = path.join(
  'd:', 'University', 'Nam04', 'LapTrinhDiDong',
  'STT05_21132291_TranTrungHieu_04', 'src', 'screens', 'Home', 'HomeScreen.jsx'
);

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Also replace the fallback buttons in the suggested accounts section
const fallbackFollowPattern = /<button className="follow-button small">Follow<\/button>/g;
const fallbackFollowReplacement = `<button className="follow-button small">
                  <img src={userPlusIcon} alt="Follow" className="follow-icon" />
                  Follow
                </button>`;

content = content.replace(fallbackFollowPattern, fallbackFollowReplacement);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('All fallback follow buttons updated successfully!');
