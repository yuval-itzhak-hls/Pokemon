import React from "react";

const bgPattern = 'src/assets/login-bg.jpg';
const logo = 'src/assets/logo.png';

const LoginLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex">
      {/* Left */}
      <div className="hidden md:flex w-1/3 bg-bg-login items-center justify-center p-8">
        <img
          src={logo}
          alt="Logo"
          className="max-w-[220px] w-full drop-shadow-lg"
          draggable={false}
        />
      </div>

      {/* Right */}
      <div className="flex-1 relative">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${bgPattern})` }}
        />

        <div className="relative flex items-center justify-center min-h-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;