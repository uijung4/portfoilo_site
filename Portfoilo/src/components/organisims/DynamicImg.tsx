import HoverZoom from '../molecules/HoverZoom'
import HoverLight from '../molecules/HoverLight'
import Shake from '../molecules/ShakeImage'

interface DynamicImgProps {
  src: string
  alt: string
  className?: string // 기본 위치
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  Effect?: Array<'hoverZoom' | 'hoverLight' | 'shake'>
}

export default function DynamicImg({
  src,
  alt,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  Effect = [],
}: DynamicImgProps) {
  const wrapperClass = ['absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer', className]
    .filter(Boolean)
    .join(' ')

  const image = <img src={src} alt={alt} className="w-full h-full" />

  return (
    <div
      className={wrapperClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {(() => {
        let content = image
        if (Effect.includes('hoverLight')) content = <HoverLight>{content}</HoverLight>
        if (Effect.includes('hoverZoom')) content = <HoverZoom>{content}</HoverZoom>
        if (Effect.includes('shake')) content = <Shake>{content}</Shake>
        return content
      })()}
    </div>
  )
}