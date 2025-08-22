import { motion } from "framer-motion";
import {
  FiAward,
  FiClock,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Button from "../component/button/Button";
import { easing } from "../utilis/helpers";
import useQuizApi from "../hooks/useQuiz";
import PopularQuizzes from "../component/homePage/PopularQuizzes";

const Home = () => {
 
  const features = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Earn Points",
      description: "Score points for correct answers and climb the leaderboard",
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Timed Challenges",
      description:
        "Test your knowledge against the clock in exciting timed quizzes",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Compete Globally",
      description:
        "Challenge players from around the world and see where you rank",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-7xl min-h-[500px] flex items-center flex-col md:flex-row justify-around mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-7xl font-bold text-primary mb-6"
            >
              <span className="text-gray-900">Quiz</span>Maniac
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Test your knowledge, challenge your friends, and become the
              ultimate quiz master!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap sm:flex-row gap-2 justify-start items-center"
            >
              <Link to="/quiz">
                <Button
                  icon={FiArrowRight}
                  iconPosition="right"
                  className="py-3"
                >
                  Start Quiz Now
                </Button>
              </Link>
              <Button variant="secondary" className="py-3">
                View Leaderboard
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: easing.fluid,  }}
          >
            <img src="/img/book.png" alt="" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold dark:text-white mb-4">
              Why Choose QuizManiac?
            </h2>
            <p className="dark:text-gray-400 max-w-2xl mx-auto">
              Experience the most engaging and fun way to test your knowledge
              across various categories
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-neutral border border-gray-200 dark:bg-gray-700 p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Quizzes Section */}
      <PopularQuizzes />

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of players worldwide and discover how much you
              really know!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <button className="bg-white text-blue-600 hover:text-blue-700 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  Get Started Free
                </button>
              </Link>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition-all duration-200">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
