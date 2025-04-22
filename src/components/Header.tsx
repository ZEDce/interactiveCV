import React from "react";
import Image from "next/image";

const Header: React.FC = () => (
  <div className="text-center mb-6 sm:mb-8">
    <Image
      src="/profilepicture.png"
      alt="Adam Bartko"
      width={128}
      height={128}
      className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-orange-300 shadow-sm"
    />
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 mb-1">
      Adam Bartko
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-gray-600">
      Interaktívny životopis pre pozíciu AI Implementátor | Orange Slovensko
    </p>
  </div>
);

export default Header;
