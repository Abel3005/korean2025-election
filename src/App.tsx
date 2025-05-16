import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Countdown from './components/Countdown';
import CandidateCard from './components/CandidateCard';
import Footer from './components/Footer';
import CandidateDetail from './components/CandidateDetail';
import { RiScales3Line, RiFileList3Line, RiCalendarEventLine, RiBarChartGroupedLine } from '@remixicon/react';
import candidatesData from './data/candidates.json';

const App: React.FC = () => {
  const electionDate = new Date('2025-06-03T09:00:00');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <main className="container mx-auto px-4 py-8">
              {/* 카운트다운 및 요약 정보 */}
              <section className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold text-gray-800 mr-4">2025 대선까지</h2>
                    <Countdown electionDate={electionDate} />
                  </div>
                  <div className="flex space-x-8">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">예상 투표율</p>
                      <p className="text-2xl font-bold text-gray-800">78.2%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">후보자 수</p>
                      <p className="text-2xl font-bold text-gray-800">{candidatesData.candidates.length}명</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 후보자 리스트 */}
              <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">대선 후보</h2>
                  <Link to="/candidates" className="text-primary font-medium flex items-center !rounded-button whitespace-nowrap">
                    모두 보기
                    <div className="w-5 h-5 flex items-center justify-center ml-1">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </Link>
                </div>
                <div className="flex overflow-x-auto pb-4 space-x-6">
                  {candidatesData.candidates.map((candidate) => (
                    <Link to={`/candidate/${candidate.id}`} key={candidate.id}>
                      <CandidateCard {...candidate} />
                    </Link>
                  ))}
                </div>
              </section>

              {/* 주요 메뉴 */}
              <section className="mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link to="/compare" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <RiScales3Line className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">후보 비교</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">후보자들의 정책을 비교해보세요</p>
                  </Link>
                  <Link to="/policy-test" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <RiFileList3Line className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">정책 테스트</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">나와 맞는 후보를 찾아보세요</p>
                  </Link>
                  <Link to="/schedule" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                      <RiCalendarEventLine className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">유세 일정</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">후보자 유세 일정을 확인하세요</p>
                  </Link>
                  <Link to="/polls" className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                      <RiBarChartGroupedLine className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800">여론조사</h3>
                    <p className="text-sm text-gray-500 text-center mt-2">최신 여론조사 결과를 확인하세요</p>
                  </Link>
                </div>
              </section>
            </main>
          } />
          <Route path="/candidate/:id" element={<CandidateDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
