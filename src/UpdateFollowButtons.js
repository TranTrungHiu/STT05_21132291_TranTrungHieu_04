const fs = require('fs');
const path = require('path');
const filePath = path.join(
  'd:', 'University', 'Nam04', 'LapTrinhDiDong',
  'STT05_21132291_TranTrungHieu_04', 'src', 'screens', 'Home', 'HomeScreen.jsx'
);

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Update all follow buttons with pattern:
// prettier-ignore
const followButtonPattern = /(<button\s+className={`follow-button small \${\s*user\?\.(following|following)\?\.(includes|includes)\((\w+)\.id\)\s*\?\s*"following"\s*:\s*""\s*}`}\s*onClick={\(\) => handleFollow\(.*\)}\s*>\s*)({\s*user\?\.following\?\.includes\(\w+\.id\)\s*\?\s*"Following"\s*:\s*"Follow"\s*})(<\/button>)/g;

const followButtonReplacement = 
`$1{user?.following?.includes($3.id) ? (
                        <>
                          <img src={userPlusIcon} alt="Following" className="follow-icon checked" />
                          Following
                        </>
                      ) : (
                        <>
                          <img src={userPlusIcon} alt="Follow" className="follow-icon" />
                          Follow
                        </>
                      )}$3`;

content = content.replace(followButtonPattern, followButtonReplacement);

// Simplified approach - target just the text part in the buttons
const simpleFollowPattern = /{user\?\.(following|following)\?\.(includes|includes)\(\w+\.id\)\s*\?\s*"Following"\s*:\s*"Follow"\s*}/g;
const simpleFollowReplacement = `{user?.following?.includes(suggestedUser.id) ? (
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

content = content.replace(simpleFollowPattern, simpleFollowReplacement);

// Also replace the fallback buttons in the suggested accounts section
const fallbackFollowPattern = /<button className="follow-button small">Follow<\/button>/g;
const fallbackFollowReplacement = `<button className="follow-button small">
                  <img src={userPlusIcon} alt="Follow" className="follow-icon" />
                  Follow
                </button>`;

content = content.replace(fallbackFollowPattern, fallbackFollowReplacement);

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');
console.log('All follow buttons updated successfully!');
