const UserImg = () => {
  return (
    <div className="flex flex-col items-center md:w-1/3">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile User</h2>
      <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/666/666201.png"
          alt="User Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default UserImg;
