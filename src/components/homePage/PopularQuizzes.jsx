import {
  FiAward,
  FiClock,
  FiUsers,
  FiArrowRight,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CategoryCard from "../cards/CategoryCard";
import usePopularQuizzes from "../../hooks/usePopularQuizzes";

const PopularQuizzes = () => {
  const { categories, loading } = usePopularQuizzes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          No Popular Quizzes Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Check back later for popular quizzes.
        </p>
      </div>
    );
  }
  
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <FiTrendingUp className="w-8 h-8 text-orange-500" />
              Popular Quizzes 🔥
            </h2>
            <p className="dark:text-gray-400 mt-2">
              Most played quizzes this week
            </p>
          </div>
          <Link
            to="/quiz"
            className="text-primary hidden text-sm dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold md:flex items-center gap-2"
          >
            View All
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
        </div>
        <div className="w-full mt-4 grid place-content-center md:hidden">
          <Link
            to="/quiz"
            className="text-primary text-sm dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center gap-2"
          >
            View All
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularQuizzes;
