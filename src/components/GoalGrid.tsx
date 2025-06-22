'use client';

import { Target, Smartphone } from 'lucide-react';
import { defaultSubs, defaultDetails } from '@/data/goals';

type DetailItem = {
  type: 'detail';
  theme: string;
  details: string[];
  index: number;
};

type CentralItem = {
  type: 'central';
  mainTheme: string;
  subThemes: string[];
};

type GridItem = DetailItem | CentralItem;

const getSubThemeColor = (index: number) => {
  const colors = [
    'from-blue-200 to-blue-300',
    'from-purple-200 to-purple-300',
    'from-green-200 to-green-300',
    'from-yellow-200 to-yellow-300',
    'from-red-200 to-red-300',
    'from-pink-200 to-pink-300',
    'from-indigo-200 to-indigo-300',
    'from-orange-200 to-orange-300'
  ];
  return colors[index % colors.length];
};

const Cell = ({ text, className = '' }: { text: string, className?: string }) => (
  <div className={`flex items-center justify-center text-center rounded-xl py-1 px-2 lg:p-1.5 lg:aspect-square ${className}`}>
    <span className="text-[clamp(8px,2.8vw,12px)] landscape:text-[clamp(10px,1.2vh,9px)] font-medium leading-tight">{text}</span>
  </div>
);

const DetailChart = ({ subTheme, details, index }: { subTheme: string, details: string[], index: number }) => {
  const items = [
    details[0], details[1], details[2],
    details[3], subTheme,   details[4],
    details[5], details[6], details[7],
  ];
  return (
    <div className="grid grid-cols-3 gap-1 bg-white/60 p-0.5 rounded-2xl shadow-md border backdrop-blur-sm">
      {items.map((item, i) => (
        <Cell 
          key={i} 
          text={item} 
          className={i === 4 
            ? `bg-gradient-to-br ${getSubThemeColor(index)} text-slate-800 shadow-lg` 
            : 'bg-white/90 shadow-sm text-gray-700'} 
        />
      ))}
    </div>
  );
};

const CentralChart = ({ mainTheme, subThemes }: { mainTheme: string, subThemes: string[] }) => {
  const items = [
    subThemes[0], subThemes[1], subThemes[2],
    subThemes[3], mainTheme,   subThemes[4],
    subThemes[5], subThemes[6], subThemes[7],
  ];
  return (
    <div className="grid grid-cols-3 gap-1 bg-white/60 p-0.5 rounded-2xl shadow-md border backdrop-blur-sm">
      {items.map((item, i) => {
        const isCenter = i === 4;
        const colorIndex = i > 4 ? i - 1 : i;
        return (
            <Cell 
                key={i} 
                text={item} 
                className={isCenter 
                    ? 'main-theme-card text-white'
                    : `bg-gradient-to-br ${getSubThemeColor(colorIndex)} text-slate-800 shadow-sm`}
            />
        );
    })}
    </div>
  );
};

export default function GoalGrid() {
  const mainTheme = "自身の成長";
  
  const gridItems: GridItem[] = [
    { type: 'detail', theme: defaultSubs[0], details: defaultDetails[0], index: 0 },
    { type: 'detail', theme: defaultSubs[1], details: defaultDetails[1], index: 1 },
    { type: 'detail', theme: defaultSubs[2], details: defaultDetails[2], index: 2 },
    { type: 'detail', theme: defaultSubs[3], details: defaultDetails[3], index: 3 },
    { type: 'central', mainTheme: mainTheme, subThemes: defaultSubs },
    { type: 'detail', theme: defaultSubs[4], details: defaultDetails[4], index: 4 },
    { type: 'detail', theme: defaultSubs[5], details: defaultDetails[5], index: 5 },
    { type: 'detail', theme: defaultSubs[6], details: defaultDetails[6], index: 6 },
    { type: 'detail', theme: defaultSubs[7], details: defaultDetails[7], index: 7 },
  ];

  return (
    <div className="goal-grid-bg min-h-screen w-full flex flex-col items-center justify-center p-2">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-full justify-center">
        <div className="flex justify-between items-center w-full mb-1">
          <h1 className="flex items-center text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
            <Target className="w-4 h-4 mr-2 text-slate-600" />
            GoalGrid
          </h1>
          <p className="text-gray-500 text-xs bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
            目標期限：2026年末
          </p>
        </div>
        
        <div className="flex-grow flex items-center justify-center">
          {/* Rotation message */}
          <div className="flex flex-col items-center justify-center text-center landscape:hidden lg:hidden">
            <Smartphone className="w-16 h-16 mb-6 text-gray-500" />
            <p className="text-xl font-semibold text-gray-700">画面を横向きにしてください</p>
            <p className="text-base text-gray-500 mt-2">このページは横画面での表示に最適化されています。</p>
          </div>

          {/* Grid */}
          <div className="hidden landscape:block lg:block w-full">
            <div className="w-full max-w-[800px] mx-auto">
              <div className="grid grid-cols-3 gap-1 sm:gap-2">
                {gridItems.map((item, index) => {
                  if (item.type === 'central') {
                    return <CentralChart key={index} mainTheme={item.mainTheme} subThemes={item.subThemes} />;
                  }
                  return <DetailChart key={index} subTheme={item.theme} details={item.details} index={item.index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 