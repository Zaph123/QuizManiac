
const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="w-full h-screen bg-neutral grid place-content-center">
      <div className="flex p-5 rounded-3xl shadow-sm bg-white items-center gap-4 flex-col">
        <p className="loader2 w-12 border-2 border-primary" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PageLoader;
