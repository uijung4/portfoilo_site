import dalmuti from '../../assets/icons/dalmuti.svg'
import dalmuti_game from '../../assets/icons/dalmuti_game.svg'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // 코드 하이라이팅 라이브러리 사실 잘 모름..
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // 다크 모드 스타일 이걸 어떻게 앎??
import { dalmutiCode } from '../../constants/dalmutiCode'; // 가독성을 위한 위치 이동
import { codeFQA } from '../../constants/codeFQA';

import Dalmuti_image4 from '../../assets/images/dalmuti_probility/4player.png';
import Dalmuti_image5 from '../../assets/images/dalmuti_probility/5player.png';
import Dalmuti_image6 from '../../assets/images/dalmuti_probility/6player.png';
import Dalmuti_image7 from '../../assets/images/dalmuti_probility/7player.png';
import Dalmuti_image8 from '../../assets/images/dalmuti_probility/8player.png';
import BackButton from '../../components/atoms/BackButton';

// 달무티 프로젝트 페이지
// 0. 배경 설정
// 1. 프로젝트 소개 섹션
// 2. 달무티 규칙 설명 섹션
// 3. 프로젝트 코드 소개
// 4. 프로젝트 결과 및 결론

// const DalmutiPage = () => {
export default function DalmutiPage() {
  return (
    <>
      {/* 뒤로가기 버튼 */}
      <BackButton />
      {/* 전체 페이지 그라데이션 */}
      <div className="min-h-screen bg-gradient-to-b from-[#6a4c7d]/80 via-[#3a2a4a]/85 to-[#111111]/95 ">

      <section className="relative h-screen flex items-center">
        {/* 왼쪽 이미지 */}
        <div className="w-1/2 flex justify-center items-center">
          <img src={dalmuti} alt="Dalmuti Icon" className="w-128 h-128" />
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="w-1/2 flex flex-col justify-center items-start px-32">
          <h1 className="text-6xl text-white font-bold mb-4">프로젝트 : 거인의 시선</h1>
          <h2 className="text-2xl text-purple-100">ㄴ 오페레이션 : 달무티 확률론</h2>
        </div>

        {/* 하단 SVG - 페이지 컬러에 맞춘 과속방지턱 뭔 소린지.. */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-20">
            <defs>
              {/* 안쪽 그라데이션 */}
              <linearGradient id="bumpGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6a4c7d" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#222222" stopOpacity="1" />
              </linearGradient>
              {/* 테두리 형광 glow 필터 */}
              <filter id="glow" x="-20%" y="-80%" width="140%" height="260%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* 안쪽 채우기 */}
            <path d="M0,60 L0,60 Q600,0 1200,60 L1200,60 Z" fill="url(#bumpGradient)" />
            {/* 형광 테두리 곡선만 */}
            <path
              d="M0,60 Q600,0 1200,60"
              fill="none"
              stroke="#b57bee"
              strokeWidth="2"
              filter="url(#glow)"
            />
          </svg>
        </div>
      </section>

      {/* 달무티 규칙 설명 섹션 */}
      <section className="relative h-screen flex items-center justify-center px-64 gap-64">
        {/* 왼쪽 이미지 */}
        <img src={dalmuti_game} alt="Dalmuti Game Icon" className="w-1/2 flex w-128 h-128" />
        
        {/* 오른쪽 텍스트 */}
        <div className="w-1/2 px-32 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-purple-100 text-4xl font-bold tracking-tight mb-4">
            달무티의 규칙
          </h2>
            <ul className="text-purple-200/80 leading-relaxed text-lg px-4 list-disc">
              <li className="mb-2">n이 1부터 12까지 n장씩 존재. 총 78장</li>
              <li className="mb-2">선을 잡은 사람은 특정 숫자 n을 m씩 낸다 <br /> (ex : 숫자 8 2장, 숫자 10 3장)</li>
              <li className="mb-2">숫자 n 미만의 카드 m장을 낼 수 있다 <br /> (ex : 8 2장 ={'>'} 6 2장 10 3장 ={'>'} 9 3장)</li>
              <li className="mb-2">없을 시 마지막으로 낸 사람이 선</li>
              <li className="mb-2">패의 카드를 전부 털어내면 승리</li>
          </ul>
        </div>    
      </section>

      {/* 프로젝트 코드 소개 섹션 */}
      <section className="px-20 py-24">
        <h2 className="text-4xl font-bold text-white mb-2">프로젝트 코드 소개</h2>
        <p className="text-purple-300 mb-8">프로젝트에서 핵심적으로 사용한 로직입니다</p>

        {/* 코드 블록 코드 소개*/}
        <div className="rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl mb-16">
          {/* 상단 타이틀 바 (에디터 느낌) */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-4 text-xs text-gray-500">달무티 선 확률 계산 코드.py</span>
          </div>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.8rem', // fontSize 아니고 줄 간격... 왜지..
              background: '#1e1e1e',
            }}
          >
            {dalmutiCode}
          </SyntaxHighlighter>
        </div>
        
        {/* 코드 결과 보고 */}
        <h2 className="text-4xl font-bold text-white mb-8">코드 결과</h2>
        <div className="flex flex-row gap-4 overflow-x-auto pb-4">
            <img src={Dalmuti_image4} alt="4 Player Probability" className="mb-8 rounded-lg shadow-lg h-86 w-auto flex-shrink-0" />
            <img src={Dalmuti_image5} alt="5 Player Probability" className="mb-8 rounded-lg shadow-lg h-86 w-auto flex-shrink-0" />
            <img src={Dalmuti_image6} alt="6 Player Probability" className="mb-8 rounded-lg shadow-lg h-86 w-auto flex-shrink-0" />
            <img src={Dalmuti_image7} alt="7 Player Probability" className="mb-8 rounded-lg shadow-lg h-86 w-auto flex-shrink-0" />
            <img src={Dalmuti_image8} alt="8 Player Probability" className="mb-8 rounded-lg shadow-lg h-86 w-auto flex-shrink-0" />
        </div>

        {/* 코드 블록 코드 리뷰*/}
        <h2 className="text-4xl font-bold text-white mb-8">개발자 FQA</h2>
        <div className="rounded-xl overflow-hidden border border-purple-500/30 shadow-2xl">
          {/* 상단 타이틀 바 */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-4 text-xs text-gray-500">코드 소개 및 FQA.py</span>
          </div>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '0.8rem',
              background: '#1e1e1e',
            }}
          >
            {codeFQA}
          </SyntaxHighlighter>
        </div>
      </section>
      </div>
    </>
  )
}