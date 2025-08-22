import { useState, useEffect } from 'react';

// Custom hook to fetch and process popular quiz categories
const usePopularQuizzes = () => {
  const [categories, setCategories] = useState([]); // State for processed category data
  const [loading, setLoading] = useState(true);     // Loading state

  useEffect(() => {
    // Fetches quizzes and computes category statistics
    const fetchPopularCategories = async () => {
      try {
        // Fetch all quizzes, sorted by number of plays (descending)
        const response = await fetch(
          'http://localhost:5000/quiz?_sort=plays&_order=desc'
        );
        const quizzes = await response.json();

        // Group quizzes by category and accumulate stats
        const categoryStats = quizzes.reduce((acc, quiz) => {
            // Initialize category if it doesn't exist
            // console.log(acc, quiz)
          if (!acc[quiz.category]) {
            acc[quiz.category] = {
              totalPlays: 0,    // Total plays for this category
              quizCount: 0,     // Number of quizzes in this category
              averageRating: 0, // Placeholder for average rating/points
              totalPoints: 0,   // Sum of points for quizzes in this category
              quizzes: []       // Array of quizzes in this category
            };
          }
          
          acc[quiz.category].totalPlays += quiz.plays || 0;    // Add plays
          acc[quiz.category].quizCount += 1;                   // Increment quiz count
          acc[quiz.category].totalPoints += quiz.points || 0;  // Add points
          acc[quiz.category].quizzes.push(quiz);               // Add quiz to array
          
          return acc;
        }, {});

        // Convert stats object to array, compute averages, filter, and sort
        const popularCategories = Object.entries(categoryStats)
          .map(([name, stats]) => ({
            name,
            totalPlays: stats.totalPlays,
            quizCount: stats.quizCount,
            // Calculate average points per quiz (rounded to 1 decimal)
            averageRating: stats.totalPlays > 0 ? (stats.totalPoints / stats.quizCount).toFixed(1) : 0,
            quizzes: stats.quizzes.slice(0, 8) // Top 8 quizzes per category
          }))
          .filter(category => category.quizCount >= 3) // Only categories with at least 3 quizzes
          .sort((a, b) => b.totalPlays - a.totalPlays) // Sort by popularity (plays)
          .slice(0, 6); // Limit to top 6 categories

        setCategories(popularCategories); // Update state with processed categories
      } catch (error) {
        // Log any errors during fetch or processing
        console.error('Error fetching popular categories:', error);
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    fetchPopularCategories(); // Run fetch on mount
  }, []);

  // Return the processed categories and loading state
  return { categories, loading };
};

export default usePopularQuizzes;