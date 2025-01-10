const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-center text-xl">CRUD App</h1>
      </header>
      <main className="mt-4">{children}</main>
      <footer className="text-center mt-4 text-gray-500">
        © 2025 CRUD App
      </footer>
    </div>
  );
};

export default Layout;
