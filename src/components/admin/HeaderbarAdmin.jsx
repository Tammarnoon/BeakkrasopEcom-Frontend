const HeaderbarAdmin = ({ toggleSidebar }) => {
  return (
    <header className="w-screen bg-gray-100 border-r border-gray-300 p-7 relative">
      <button
        onClick={toggleSidebar}
        className="text-lg font-bold focus:outline-none"
      >
        ☰
      </button>
    </header>
  );
};

export default HeaderbarAdmin;
