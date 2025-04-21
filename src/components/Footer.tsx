import React from 'react';
import { RiFacebookFill, RiTwitterXFill, RiInstagramFill, RiYoutubeFill } from '@remixicon/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <img src="/logo.png" alt="대선 2025" className="h-16" />
            </div>
            <p className="text-gray-400 text-sm">
              2025 대한민국 대선 후보 정보 플랫폼입니다.유권자의 올바른 선택을
              돕기 위한 공정하고 정확한 정보를 제공합니다.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">메뉴</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-gray-400 hover:text-white text-sm">후보자</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">정책</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">일정</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">여론조사</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">이용약관</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">문의</a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <RiFacebookFill className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <RiTwitterXFill className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <RiInstagramFill className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <RiYoutubeFill className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 대선 정보 플랫폼. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 