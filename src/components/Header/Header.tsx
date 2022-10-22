import React from 'react';
import { Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import logos from '../../assets/logo-bg-new.webp';
import Container from '../Container/Container';

function Header({
  onChangeSearchText,
}: {
  onChangeSearchText: (text: string) => void;
}) {
  const input = (
    <div className="relative">
      <input
        placeholder="Search here..."
        onChange={(e) => onChangeSearchText(e.target.value)}
        className="border rounded-full py-2 px-3 w-full"
      />
      <Search className="absolute top-3 right-5 opacity-20" />
    </div>
  );
  return (
    <div className="bg-white sticky top-0 z-10 mb-6">
      <div className="flex justify-center h-[78px] items-center">
        <header className="flex w-full items-center justify-between max-w-[1440px] mx-6 sm:mx-10">
          <Link to="/">
            <img height={44} width={98} src={logos} alt="logo" />
          </Link>
          <div className="max-w-sm w-full hidden sm:block">{input}</div>
          <ol className="flex">
            <Link to="/bookmark">
              <li className="text-sm text-primary font-bold">Bookmark</li>
            </Link>
          </ol>
        </header>
      </div>
      <Container className="px-4 pb-4 sm:hidden ">{input}</Container>
    </div>
  );
}

export default Header;
