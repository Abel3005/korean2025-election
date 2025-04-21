import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  GlobeAltIcon,
  ChatBubbleLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import candidatesData from '../data/candidates.json';

interface Schedule {
  date: string;
  time: string;
  location: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Policy {
  title: string;
  description: string;
  executionPlan: string;
  expectedEffect: string;
  isCore?: boolean;
}

interface PolicyCategory {
  [key: string]: Policy[];
}

interface Promise {
  title: string;
  category: string;
  status: 'completed' | 'inProgress' | 'notStarted';
  progress: number;
  description: string;
  tags: string[];
}

interface PreviousPromise {
  election: string;
  position: string;
  promises: Promise[];
}

type PolicyTabs = 'all' | 'economy' | 'welfare' | 'education' | 'diplomacy' | 'environment';

interface Candidate {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  image: string;
  description: string;
  supportRate: number;
  birthDate?: string;
  birthPlace?: string;
  family?: string;
  religion?: string;
  education?: {
    highSchool?: string;
    bachelor?: string;
    master?: string;
    doctor?: string;
  };
  career: string[];
  policies: {
    [key in Exclude<PolicyTabs, 'all'>]: Policy[];
  };
  schedule?: Schedule[];
  previousPromises?: PreviousPromise[];
}

const getPartyColor = (color: string) => {
  const colors: { [key: string]: string } = {
    'blue': '#2563eb',
    'red': '#dc2626',
    'green': '#16a34a',
    'yellow': '#ca8a04'
  };
  return colors[color] || '#2563eb';
};

const getCategoryColor = (category: Exclude<PolicyTabs, 'all'>): string => {
  const colors = {
    economy: 'blue',
    welfare: 'indigo',
    education: 'green',
    diplomacy: 'purple',
    environment: 'teal'
  };
  return colors[category];
};

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PolicyTabs>('all');
  const [isSupported, setIsSupported] = useState(false);
  const [showMoreCareer, setShowMoreCareer] = useState(false);
  const [expandedPolicies, setExpandedPolicies] = useState<{
    [key in Exclude<PolicyTabs, 'all'>]?: { [key: number]: boolean };
  }>({});

  const candidate = candidatesData.candidates.find((c) => c.id === id);

  useEffect(() => {
    if (!candidate) {
      navigate('/');
      return;
    }
  }, [candidate, navigate]);

  const handleSupportClick = () => {
    setIsSupported(!isSupported);
  };

  const togglePolicyDetails = (category: Exclude<PolicyTabs, 'all'>, index: number) => {
    setExpandedPolicies(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [index]: !prev[category]?.[index]
      }
    }));
  };

  const policyTabs: Exclude<PolicyTabs, 'all'>[] = ['economy', 'welfare', 'education', 'diplomacy', 'environment'];

  if (!candidate) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div 
        className="relative h-64 bg-gradient-to-b"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, ${getPartyColor(candidate.partyColor)}99, ${getPartyColor(candidate.partyColor)}66)`
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-full bg-white shadow"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </div>

      {/* 프로필 */}
      <div className="relative px-4 pb-24">
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-20 mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden -mt-16 mb-4 md:mb-0 shadow-md">
              <img
                src={candidate.image}
                alt={candidate.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mr-3">
                      {candidate.party}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {candidate.name} 후보
                    </h1>
                  </div>
                  <p className="text-gray-600 mt-2">{candidate.description}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <div className="mr-6">
                    <p className="text-sm text-gray-500">현재 지지율</p>
                    <p className="text-2xl font-bold text-blue-600">{candidate.supportRate}%</p>
                  </div>
                  <button
                    onClick={handleSupportClick}
                    className={`support-button px-6 py-3 rounded-button font-medium flex items-center ${
                      isSupported ? 'bg-gray-500' : 'bg-blue-600'
                    } text-white`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      {isSupported ? <HeartSolidIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
                    </div>
                    {isSupported ? '지지함' : '지지하기'}
                  </button>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <ShareIcon className="w-4 h-4" />
                  </div>
                  공유하기
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm flex items-center">
                  {/* <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <GlobeAltIcon className="w-4 h-4" />
                  </div> */}
                  페이스북
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm flex items-center">
                  {/* <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <GlobeAltIcon className="w-4 h-4" />
                  </div> */}
                  X
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm flex items-center">
                  <div className="w-4 h-4 flex items-center justify-center mr-1">
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                  </div>
                  카카오톡
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 인적사항 및 경력 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">인적사항 및 경력</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-sm font-medium text-gray-500 mb-2">기본 정보</h3>
              <ul className="space-y-2">
                <li className="flex">
                  <span className="text-gray-600 w-20">출생</span>
                  <span className="font-medium">{candidate.birthDate}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-600 w-20">출신지</span>
                  <span className="font-medium">{candidate.birthPlace}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-600 w-20">가족</span>
                  <span className="font-medium">{candidate.family}</span>
                </li>
                <li className="flex">
                  <span className="text-gray-600 w-20">종교</span>
                  <span className="font-medium">{candidate.religion}</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-sm font-medium text-gray-500 mb-2">학력</h3>
              <ul className="space-y-2">
                {candidate.education?.highSchool && (
                  <li className="flex">
                    <span className="text-gray-600 w-20">고등학교</span>
                    <span className="font-medium">{candidate.education.highSchool}</span>
                  </li>
                )}
                {candidate.education?.bachelor && (
                  <li className="flex">
                    <span className="text-gray-600 w-20">학사</span>
                    <span className="font-medium">{candidate.education.bachelor}</span>
                  </li>
                )}
                {candidate.education?.master && (
                  <li className="flex">
                    <span className="text-gray-600 w-20">석사</span>
                    <span className="font-medium">{candidate.education.master}</span>
                  </li>
                )}
                {candidate.education?.doctor && (
                  <li className="flex">
                    <span className="text-gray-600 w-20">박사</span>
                    <span className="font-medium">{candidate.education.doctor}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-sm font-medium text-gray-500 mb-2">주요 경력</h3>
              <div className="space-y-4">
                {candidate.career.slice(0, showMoreCareer ? undefined : 4).map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-24 text-gray-500">{index === 0 ? '현재' : '전'}</div>
                    <div className="flex-1">{item}</div>
                  </div>
                ))}
                {candidate.career.length > 4 && (
                  <button
                    onClick={() => setShowMoreCareer(!showMoreCareer)}
                    className="text-primary font-medium flex items-center"
                  >
                    {showMoreCareer ? '접기' : '더 많은 경력 보기'}
                    <div className="w-5 h-5 flex items-center justify-center ml-1">
                      {showMoreCareer ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 공약 */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">주요 공약</h2>
          {/* 탭 메뉴 */}
          <div className="border-b mb-6 overflow-x-auto">
            <div className="flex space-x-8 min-w-max">
              <button
                className={`tab-button py-2 px-1 font-medium ${
                  activeTab === 'all' ? 'text-primary active' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('all')}
              >
                전체
              </button>
              {policyTabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-button py-2 px-1 font-medium ${
                    activeTab === tab ? 'text-primary active' : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'economy' && '경제 분야'}
                  {tab === 'welfare' && '복지 분야'}
                  {tab === 'education' && '교육 분야'}
                  {tab === 'diplomacy' && '외교/안보 분야'}
                  {tab === 'environment' && '환경 분야'}
                </button>
              ))}
            </div>
          </div>

          {/* 전체 탭 내용 */}
          <div className={`tab-content ${activeTab === 'all' ? '' : 'hidden'}`}>
            {policyTabs.map((category) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  {category === 'economy' && '경제 분야'}
                  {category === 'welfare' && '복지 분야'}
                  {category === 'education' && '교육 분야'}
                  {category === 'diplomacy' && '외교/안보 분야'}
                  {category === 'environment' && '환경 분야'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidate.policies[category]?.map((policy, index) => (
                    <div
                      key={index}
                      className={`policy-card bg-${getPartyColor(candidate.partyColor)}-50 p-4 rounded-lg border border-${getPartyColor(candidate.partyColor)}-100`}
                      onClick={() => togglePolicyDetails(category, index)}
                    >
                      <div>
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium text-gray-900">{policy.title}</h4>
                          {policy.isCore && (
                            <span className={`ml-2 px-2 py-0.5 bg-${getPartyColor(candidate.partyColor)}-600 text-white text-xs rounded-full`}>
                              핵심
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{policy.description}</p>
                        <div className={`policy-details ${expandedPolicies[category]?.[index] ? '' : 'hidden'} mt-4`}>
                          <div className="bg-white p-3 rounded-lg text-sm">
                            <p className="font-medium text-gray-800 mb-1">실행 계획</p>
                            <p className="text-gray-600 mb-3">{policy.executionPlan}</p>
                            <p className="font-medium text-gray-800 mb-1">기대 효과</p>
                            <p className="text-gray-600">{policy.expectedEffect}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 개별 카테고리 탭 내용 */}
          {policyTabs.map((category) => (
            <div
              key={category}
              className={`tab-content ${activeTab === category ? '' : 'hidden'}`}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {category === 'economy' && '경제 분야'}
                {category === 'welfare' && '복지 분야'}
                {category === 'education' && '교육 분야'}
                {category === 'diplomacy' && '외교/안보 분야'}
                {category === 'environment' && '환경 분야'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidate.policies[category]?.map((policy, index) => (
                  <div
                    key={index}
                    className={`policy-card bg-${getPartyColor(candidate.partyColor)}-50 p-4 rounded-lg border border-${getPartyColor(candidate.partyColor)}-100`}
                    onClick={() => togglePolicyDetails(category, index)}
                  >
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium text-gray-900">{policy.title}</h4>
                        {policy.isCore && (
                          <span className={`ml-2 px-2 py-0.5 bg-${getPartyColor(candidate.partyColor)}-600 text-white text-xs rounded-full`}>
                            핵심
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{policy.description}</p>
                      <div className={`policy-details ${expandedPolicies[category]?.[index] ? '' : 'hidden'} mt-4`}>
                        <div className="bg-white p-3 rounded-lg text-sm">
                          <p className="font-medium text-gray-800 mb-1">실행 계획</p>
                          <p className="text-gray-600 mb-3">{policy.executionPlan}</p>
                          <p className="font-medium text-gray-800 mb-1">기대 효과</p>
                          <p className="text-gray-600">{policy.expectedEffect}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 이전 공약 이행 현황 */}
        {candidate.previousPromises && candidate.previousPromises.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">이전 공약 이행 현황</h2>
            <div className="space-y-8">
              {candidate.previousPromises.map((previousPromise, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{previousPromise.election}</h3>
                    <p className="text-gray-600">{previousPromise.position}</p>
                  </div>
                  <div className="space-y-4">
                    {previousPromise.promises.map((promise, promiseIndex) => (
                      <div key={promiseIndex} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{promise.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            promise.status === 'completed' ? 'bg-green-100 text-green-800' :
                            promise.status === 'inProgress' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {promise.status === 'completed' ? '완료' :
                             promise.status === 'inProgress' ? '진행중' : '미시작'}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>진행률</span>
                            <span>{promise.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-full rounded-full ${
                                promise.status === 'completed' ? 'bg-green-500' :
                                promise.status === 'inProgress' ? 'bg-blue-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${promise.progress}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{promise.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {promise.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 일정 */}
        {candidate.schedule && candidate.schedule.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">일정</h2>
            <div className="space-y-4">
              {candidate.schedule.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-1">
                    <p className="font-medium">{event.date} {event.time}</p>
                    <p className="text-gray-600">{event.location}</p>
                    <p className="text-gray-500 mt-1">{event.description}</p>
                  </div>
                  <MapPinIcon className="w-5 h-5 text-red-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDetail;