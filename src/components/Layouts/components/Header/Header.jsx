import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if(searchKeyword.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword('');
    }
  };

  return (
    <header>
      <div className="w-full mx-auto container p-4  z-10">
        <MobileHeader
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          handleSearch={handleSearch}
        />
        <DesktopHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          handleSearch={handleSearch}
        />
      </div>
    </header>
  );
};

export default Header;
