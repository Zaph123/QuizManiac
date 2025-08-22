import ThemeToggleButton from "../button/ThemeToggleButton";
import logo from "../../assets/img/logo-transparent.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Quiz", path: "/quiz" },
];

const MainNav = () => {
  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="p-5 px-10 h-[80px] flex items-center justify-between bg-white border-b">
        {/* Logo and Title */}
        <div>
          {/* <h1 className="font-bold text-3xl">
            <span className="text-gray-900">Quiz</span>
            <span className="text-primary">Maniac</span>
          </h1> */}
          <img src={logo} width={200} alt="app logo" />
        </div>
        <div className="flex items-center justify-between gap-5">
          {/* Navigation Links */}
          <NavLinks />
          {/* Theme Toggle Button */}
          {/* This button toggles between light and dark themes */}
          <div>
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLinks = () => {
  return (
    <div className="flex items-center space-x-4">
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.path}
          className="text-gray-500 text-sm hover:text-gray-900"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}
export default MainNav;
