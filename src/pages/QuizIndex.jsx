import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiClock,
  FiGrid,
} from "react-icons/fi";
import PageLoader from "../component/loaders/PageLoader";
import QuizCard from "../component/QuizCard";
import { categoryIcons } from "../utilis/helpers";
import PopularQuizzes from "../component/homePage/PopularQuizzes";

const QuizIndex = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchAllData = async () => {
    try {
      // Fetch all quizzes
      const response = await fetch("http://localhost:5000/quiz");
      if (!response.ok) throw new Error("Network Problem");

      const data = await response.json();
      setQuizzes(data);
      // Calculate categories from quizzes
      const categoryMap = {};
      data.forEach((quiz) => {
        if (!categoryMap[quiz.category]) {
          categoryMap[quiz.category] = {
            name: quiz.category,
            count: 0,
            totalPlays: 0,
            averageRating: 0,
            quizzes: [],
          };
        }
        categoryMap[quiz.category].count++;
        categoryMap[quiz.category].totalPlays += quiz.plays || 0;
        categoryMap[quiz.category].quizzes.push(quiz);
      });

      // Convert to array and calculate averages
      const categoryArray = Object.values(categoryMap).map((cat) => ({
        ...cat,
        averageRating:
          cat.totalPlays > 0 ? (cat.totalPlays / cat.count).toFixed(1) : 0,
      }));

      setCategories(categoryArray);

      // Get recent quizzes (mock recently played from localStorage)
      const recentlyPlayed = JSON.parse(
        localStorage.getItem("recentlyPlayed") || "[]"
      );
      const recent = data
        .filter((q) => recentlyPlayed.includes(q.id))
        .slice(0, 4);
      setRecentQuizzes(recent);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Filter quizzes based on search and category
  // const filteredQuizzes = quiz.questions.filter((quiz) => {
  //   const matchesSearch =
  //     quiz.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     quiz.category.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "all" || quiz.category === selectedCategory;
  //   return matchesSearch && matchesCategory;
  // });


  return (
    <div className="min-h-screen mt-20 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r min-h-[500px] flex items-center justify-center from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">
              Your Brainpower Adventure Starts Here!
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Explore {quizzes.length} quizzes across {categories.length}{" "}
              categories
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search quizzes or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-28"
        >
          <StatsCard
            icon={FiGrid}
            title="Quizzes"
            value={quizzes.length}
            color="text-blue-600"
          />

          <StatsCard
            icon={<FiGrid className="w-8 h-8" />}
            title="Total Categories"
            value={categories.length}
            color="text-green-600"
          />
          <StatsCard
            icon={<FiGrid className="w-8 h-8" />}
            title="Total Plays"
            value={quizzes.reduce((sum, q) => sum + (q.plays || 0), 0)}
            color="text-purple-600"
          />

          <StatsCard
            icon={<FiGrid className="w-8 h-8" />}
            title="Average Rating"
            value={
              Math.round(
                (quizzes.reduce((sum, q) => sum + (q.rating || 0), 0) /
                  quizzes.length) *
                  10
              ) / 10 || 0
            }
            color="text-orange-600"
          />
        </motion.div>

        {/* Recently Played Section */}
        {recentQuizzes.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiClock className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recently Played
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentQuizzes.map((quiz, index) => (
                <QuizCard key={quiz.id} quiz={quiz} index={index} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Categories Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FiGrid className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Browse Categories
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                All
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 rounded-xl text-center transition-all duration-200 ${
                  selectedCategory === category.name
                    ? "bg-primary text-white transform scale-105"
                    : "bg-white dark:bg-gray-800 border text-gray-700 dark:text-gray-300"
                }`}
              >
                <div className="text-2xl mb-2">
                  {categoryIcons[category.name] || "📊"}
                </div>
                <div className="text-sm font-medium truncate">
                  {category.name}
                </div>
                <p
                  className={`text-xs ${
                    selectedCategory === category.name ? "text-white" : ""
                  } dark:text-gray-400 mt-1`}
                >
                  {category.count} quizzes
                </p>
              </motion.button>
            ))}
          </div>

          {/* {filteredQuizzes.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No quizzes found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or category filter
              </p>
            </div>
          )} */}
        </motion.section>

        {/* Popular Quizzes Section */}
        <PopularQuizzes />
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-10 text-center shadow-3xl">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{title}</div>
    </div>
  );
};
export default QuizIndex;
