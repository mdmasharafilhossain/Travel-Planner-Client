

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      
      <div className="bg-white dark:bg-gray-800 max-w-lg w-full p-8 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
        
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome to <span className="text-orange-600">Admin Dashboard</span>
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mt-3 text-sm">
          We are glad to have you here. Manage all platform settings and all user activities.
        </p>

        <div className="mt-6">
          <span className="text-4xl font-bold text-orange-500">👋</span>
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
