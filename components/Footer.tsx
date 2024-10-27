import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="pb-4 px-4">
      <div className="bg-white p-4 text-black text-center rounded-[32px]">
        <p>
          © {new Date().getFullYear()} Безпечна платформа для досягнення цілей
        </p>
      </div>
    </footer>
  );
};

export default Footer;
