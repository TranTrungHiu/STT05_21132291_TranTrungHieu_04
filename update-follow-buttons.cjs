// Update all follow buttons in the HomeScreen.jsx

const fs = require('fs');
const path = require('path');

const filePath = path.join('d:', 'University', 'Nam04', 'LapTrinhDiDong', 
                           'STT05_21132291_TranTrungHieu_04', 'src', 
                           'screens', 'Home', 'HomeScreen.jsx');

let content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of the direct text rendering with our helper function call
const oldPattern = /{user\?\.(following|following)\?\.(includes|includes)\(\w+\.id\)\s*\?\s*"Following"\s*:\s*"Follow"\s*}/g;
const newReplacement = '{renderFollowButton(user?.following?.includes(suggestedUser.id))}';

const updatedContent = content.replace(oldPattern, newReplacement);

// Write updated file
fs.writeFileSync(filePath, updatedContent, 'utf8');

console.log('Follow buttons updated successfully!');
