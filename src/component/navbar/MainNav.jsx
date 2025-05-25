import React from "react";

const MainNav = () => {
  return (
    <nav className="fixed w-full z-[1000] top-0 left-0">
      <div className="p-5 px-10 h-[80px]">
        <div>
          <h1 className="font-bold text-3xl">
            <span className="text-gray-900">Quiz</span>
            <span className="text-primary">Maniac</span>
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
