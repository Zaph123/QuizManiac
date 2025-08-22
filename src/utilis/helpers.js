export const categories = [
  "Politics",
  "Biology",
  "Environment",
  "Astronomy",
  "Physics",
  "Chemistry",
  "Geography",
  "Math",
  "History",
  "Art",
  "Technology",
  "Sports",
  "Literature",
  "Economics",
];

export const difficulties = ["easy", "medium", "hard"];

export const easing = {
  sleek: [0.16, 1, 0.3, 1],          // easeOutExpo
  bounce: [0.34, 1.56, 0.64, 1],     // easeOutBack
  smooth: [0.25, 0.46, 0.45, 0.94],  // easeOutQuad-like
  sharp: [0.77, 0, 0.175, 1],        // easeInOutQuart
  fluid: [0.645, 0.045, 0.355, 1]    // easeInOutCubic
};

export const getRandomDifficulty = () => {
  const randomIndex = Math.floor(Math.random() * difficulties.length);
  return difficulties[randomIndex];
}

export const getRandomQuestions = (questions, count = 10) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const newQuestions = questions.filter((_, index) => index !== randomIndex);
  return newQuestions.slice(0, count); // Return 'count' random questions excluding the one at randomIndex
};

export const getRandomQuestion = (questions) => {
  if (!questions || questions.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
}

export const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomCategory = () => {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
};

export const categoryIcons = {
    Biology: '🧬',
    Physics: '⚛️',
    Chemistry: '🧪',
    Math: '🧮',
    Geography: '🌎',
    History: '🏛️',
    'Computer Science': '💻',
    Astronomy: '🔭',
    Technology: '📱',
    Sports: '⚽',
    Literature: '📚',
    Art: '🎨',
    Politics: '🏛️',
    Environment: '🌿',
    Economics: '💰'
  };