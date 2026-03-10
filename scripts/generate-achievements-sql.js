// scripts/generate-achievements-sql.js
const fs = require("fs");

// Fungsi untuk menjana senarai achievement (sama seperti di komponen)
function generateAchievements() {
  const achievements = [];

  // 1. Daily login (30 hari)
  for (let i = 1; i <= 30; i++) {
    achievements.push({
      id: `daily-${i}`,
      name: `Day ${i} Streak`,
      description: `Log in for ${i} day${i > 1 ? "s" : ""} in a row.`,
      icon: "CalendarDaysIcon",
      color: "blue",
      xpReward: 5 + i * 2,
      type: "badge",
      category: "daily",
      rewardImage: null,
    });
  }

  // 2. Tutorial completions
  for (let i = 1; i <= 20; i++) {
    achievements.push({
      id: `tutorial-${i}`,
      name: `Tutorial Master ${i}`,
      description: `Complete ${i * 5} tutorials.`,
      icon: "BookOpenIcon",
      color: "green",
      xpReward: 20 * i,
      type: "badge",
      category: "tutorial",
      rewardImage: null,
    });
  }

  // 3. Projects completed
  for (let i = 1; i <= 15; i++) {
    achievements.push({
      id: `project-${i}`,
      name: `Project Builder ${i}`,
      description: `Finish ${i * 2} projects.`,
      icon: "CodeBracketIcon",
      color: "purple",
      xpReward: 50 * i,
      type: "badge",
      category: "project",
      rewardImage: null,
    });
  }

  // 4. AI Chat usage
  for (let i = 1; i <= 25; i++) {
    achievements.push({
      id: `ai-${i}`,
      name: `AI Explorer ${i}`,
      description: `Use AI Chat ${i * 10} times.`,
      icon: "ChatBubbleLeftRightIcon",
      color: "indigo",
      xpReward: 15 * i,
      type: "badge",
      category: "ai",
      rewardImage: null,
    });
  }

  // 5. Game wins
  for (let i = 1; i <= 20; i++) {
    achievements.push({
      id: `game-${i}`,
      name: `Game Champion ${i}`,
      description: `Win ${i * 3} games.`,
      icon: "TrophyIcon",
      color: "yellow",
      xpReward: 25 * i,
      type: "badge",
      category: "game",
      rewardImage: null,
    });
  }

  // 6. Search usage
  for (let i = 1; i <= 20; i++) {
    achievements.push({
      id: `search-${i}`,
      name: `Search Wizard ${i}`,
      description: `Perform ${i * 5} searches.`,
      icon: "MagnifyingGlassIcon",
      color: "cyan",
      xpReward: 10 * i,
      type: "badge",
      category: "search",
      rewardImage: null,
    });
  }

  // 7. Code Editor usage
  for (let i = 1; i <= 20; i++) {
    achievements.push({
      id: `code-${i}`,
      name: `Code Master ${i}`,
      description: `Spend ${i * 2} hours in the code editor.`,
      icon: "CommandLineIcon",
      color: "gray",
      xpReward: 30 * i,
      type: "badge",
      category: "code",
      rewardImage: null,
    });
  }

  // 8. Learning Paths completed
  for (let i = 1; i <= 10; i++) {
    achievements.push({
      id: `path-${i}`,
      name: `Pathfinder ${i}`,
      description: `Complete ${i} learning paths.`,
      icon: "RocketLaunchIcon",
      color: "orange",
      xpReward: 40 * i,
      type: "badge",
      category: "path",
      rewardImage: null,
    });
  }

  // 9. SDK examples used
  for (let i = 1; i <= 15; i++) {
    achievements.push({
      id: `sdk-${i}`,
      name: `SDK Sampler ${i}`,
      description: `Try ${i * 2} SDK examples.`,
      icon: "BeakerIcon",
      color: "pink",
      xpReward: 15 * i,
      type: "badge",
      category: "sdk",
      rewardImage: null,
    });
  }

  // 10. API Keys created
  for (let i = 1; i <= 5; i++) {
    achievements.push({
      id: `apikey-${i}`,
      name: `Key Master ${i}`,
      description: `Create ${i} API key${i > 1 ? "s" : ""}.`,
      icon: "KeyIcon",
      color: "amber",
      xpReward: 20 * i,
      type: "badge",
      category: "apikey",
      rewardImage: null,
    });
  }

  // 11. Challenges solved
  for (let i = 1; i <= 20; i++) {
    achievements.push({
      id: `challenge-${i}`,
      name: `Challenge Solver ${i}`,
      description: `Solve ${i * 2} coding challenges.`,
      icon: "PuzzlePieceIcon",
      color: "lime",
      xpReward: 25 * i,
      type: "badge",
      category: "challenge",
      rewardImage: null,
    });
  }

  // 12. Open Source contributions
  for (let i = 1; i <= 10; i++) {
    achievements.push({
      id: `os-${i}`,
      name: `Open Source Contributor ${i}`,
      description: `Make ${i} contribution${i > 1 ? "s" : ""} to open source.`,
      icon: "GlobeAltIcon",
      color: "teal",
      xpReward: 50 * i,
      type: "badge",
      category: "os",
      rewardImage: null,
    });
  }

  // 13. Level achievements
  const levelMilestones = [
    5, 10, 15, 20, 30, 45, 60, 65, 70, 75, 80, 85, 90, 95, 99, 100,
  ];
  levelMilestones.forEach((lvl) => {
    achievements.push({
      id: `level-${lvl}`,
      name: lvl === 100 ? "MAX Level" : `Level ${lvl}`,
      description:
        lvl === 100 ? "Reach the maximum level!" : `Reach level ${lvl}.`,
      icon: "AcademicCapIcon",
      color: "purple",
      xpReward: lvl * 20,
      type: "badge",
      category: "level",
      rewardImage: null,
    });
  });

  // 14. Special avatars
  const avatarLevels = [10, 25, 50, 75, 100];
  avatarLevels.forEach((lvl) => {
    achievements.push({
      id: `avatar-${lvl}`,
      name: `Avatar: ${lvl} Club`,
      description: `Unlock special avatar at level ${lvl}.`,
      icon: "PhotoIcon",
      color: "yellow",
      xpReward: 0,
      type: "avatar",
      category: "avatar",
      rewardImage: `/avatars/level${lvl}.png`,
    });
  });

  // 15. Special borders
  for (let i = 1; i <= 5; i++) {
    achievements.push({
      id: `border-${i}`,
      name: `Border: Champion ${i}`,
      description: `Earn champion border by winning ${i * 10} games.`,
      icon: "UserCircleIcon",
      color: "red",
      xpReward: 0,
      type: "border",
      category: "border",
      rewardImage: `/borders/champ${i}.png`,
    });
  }

  // 16. Miscellaneous
  for (let i = 1; i <= 30; i++) {
    achievements.push({
      id: `misc-${i}`,
      name: `Mystery Achievement ${i}`,
      description: `Complete a secret task.`,
      icon: "GiftIcon",
      color: "indigo",
      xpReward: 10 + i,
      type: "badge",
      category: "misc",
      rewardImage: null,
    });
  }

  return achievements;
}

// Escape single quotes untuk SQL
function escapeSql(str) {
  if (typeof str !== "string") return str;
  return str.replace(/'/g, "''");
}

// Hasilkan SQL INSERT
function generateSql() {
  const achievements = generateAchievements();
  let sql = `-- Jadual achievements
CREATE TABLE IF NOT EXISTS achievements (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50) NOT NULL,
  color VARCHAR(20) NOT NULL,
  xp_reward INT NOT NULL DEFAULT 0,
  type VARCHAR(20) NOT NULL,
  category VARCHAR(20),
  reward_image VARCHAR(255)
);

-- INSERT achievements
INSERT INTO achievements (id, name, description, icon, color, xp_reward, type, category, reward_image) VALUES
`;

  const values = achievements.map((a) => {
    const desc = escapeSql(a.description);
    const reward = a.rewardImage ? `'${a.rewardImage}'` : "NULL";
    return `('${a.id}', '${escapeSql(a.name)}', '${desc}', '${a.icon}', '${a.color}', ${a.xpReward}, '${a.type}', '${a.category}', ${reward})`;
  });

  sql += values.join(",\n") + ";";
  return sql;
}

// Tulis ke fail atau stdout
if (require.main === module) {
  const sql = generateSql();
  console.log(sql);
}
