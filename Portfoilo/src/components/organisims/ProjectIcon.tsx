import text from '../../assets/icons/text.svg'
import folder from '../../assets/icons/folder.svg'

export default function ProjectIcon({
  image,
  title,
  onMouseEnter,
  onMouseLeave,
  onClick,
  top,
  left,
}: {
  image: 'folder' | 'text'
  title: string
  top: string
  left: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}) {
  const src = image === 'folder' ? folder : text

  return (
    <div
      className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
      style={{ top, left }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <img src={src} alt={title} className="w-24 h-24" />
      <span className="text-xs text-center text-gray-800 font-semibold max-w-[80px] leading-tight">
        {title}
      </span>
    </div>
  )
}   