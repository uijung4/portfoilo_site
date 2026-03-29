import { useNavigate } from 'react-router-dom'

export default function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      className={[
        'absolute top-5 left-5 z-50',
        'w-11 h-11 rounded-full',
        'flex items-center justify-center',
        // 유리 효과
        'bg-white/10 backdrop-blur-md',
        'border border-white/30',
        'shadow-[0_4px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.35)]',
        // 텍스트
        'text-blue-700 text-6xl leading-none',
        // 인터랙션
        'transition-all duration-250 ease-out',
        'hover:bg-white/20 hover:border-white/50 hover:-translate-x-0.5',
        'hover:shadow-[0_4px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.5)]',
        'active:scale-90 active:bg-white/15',
      ].join(' ')}
      onClick={() => navigate(-1)}
    >
      ‹
    </button>
  )
}