// components/CategoryCard.jsx
import { motion } from 'framer-motion';
import { FiUsers, FiBarChart2, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import { categoryIcons } from '../../utilis/helpers';

const CategoryCard = ({ category }) => {
 
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl border p-6  dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl">
          {categoryIcons[category.name] || '📊'}
        </div>
        <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm">
          <FiUsers className="w-4 h-4" />
          <span>{category.totalPlays.toLocaleString()}</span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {category.name}
      </h3>
      
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <span className="flex items-center gap-1">
          <FiBarChart2 className="w-4 h-4" />
          {category.quizCount} quizzes
        </span>
        <span>⭐ {category.averageRating}</span>
      </div>

      {/* Progress bar for popularity */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
          style={{ width: `${Math.min((category.totalPlays / 5000) * 100, 100)}%` }}
        />
      </div>

      {/* Action Button */}
      <Link to={`/quiz/category/${encodeURIComponent(category.name)}`}>
        <Button icon={FiArrowRight} iconPosition='right' className="w-full">
          Start Quiz
        </Button>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;