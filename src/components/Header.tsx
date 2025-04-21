import React from 'react';
import { RiSearchLine } from '@remixicon/react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="대선 2025" className="h-12 brightness-0" />
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="font-medium text-gray-900 hover:text-primary">후보자</a>
          <a href="#" className="font-medium text-gray-900 hover:text-primary">정책 비교</a>
          <a href="#" className="font-medium text-gray-900 hover:text-primary">유세 일정</a>
          <a href="#" className="font-medium text-gray-900 hover:text-primary">여론조사</a>
          <a href="#" className="font-medium text-gray-900 hover:text-primary">뉴스</a>
        </nav>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="검색"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-button text-sm focus:border-primary"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
              <RiSearchLine />
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header; 