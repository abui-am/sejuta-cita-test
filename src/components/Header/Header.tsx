import React from 'react';

import logos from '../../assets/logo-bg-new.webp';

function Header({
  onChangeSearchText,
}: {
  onChangeSearchText: (text: string) => void;
}) {
  return (
    <div className="bg-white sticky top-0">
      <div className="flex justify-center h-[78px]">
        <header className="flex w-full items-center justify-between max-w-[1440px] mx-6 sm:mx-10">
          <div>
            <img height={44} width={98} src={logos} alt="logo" />
          </div>
          <ol className="flex">
            <li className="text-sm text-primary">Booku</li>
          </ol>
        </header>
      </div>
      <div className="px-4 pb-4">
        <input
          placeholder="Search here..."
          onChange={(e) => onChangeSearchText(e.target.value)}
          className="border rounded-full py-2 px-3 w-full"
        />
      </div>
    </div>
  );
}

export default Header;
