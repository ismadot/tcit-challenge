import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono">
      {/* Header */}
      <header className="bg-yellow-500 text-gray-900 p-4 text-center shadow-lg">
        <h1 className="text-2xl tracking-wider">
          <span className="pixel-border">Post Manager</span>
        </h1>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-2 text-sm">
        <p>© 2025 8-bit Post Manager. Powered by Retro Style.</p>
      </footer>
    </div>
  );
};

export default Layout;
