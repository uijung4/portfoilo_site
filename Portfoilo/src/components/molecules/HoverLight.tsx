interface HoverLightProps {
  children: React.ReactNode
}

export default function HoverLight({ children }: HoverLightProps) {
  return (
    // w랑 h는 부모 요소에 맞게 조절되도록 설정
    <div className="w-full h-full transition-all duration-300 ease-out hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]">
      {children}
    </div>
  )
}
