import Cheolsu1 from '../../assets/icons/cheolsu1.svg'
import Cheolsu2 from '../../assets/icons/cheolsu2.svg'

interface CheolsuCharacterProps {
  showBubble: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default function CheolsuCharacter({
  showBubble,
  onMouseEnter,
  onMouseLeave,
}: CheolsuCharacterProps) {
  return (
    <img
      src={showBubble ? Cheolsu2 : Cheolsu1}
      alt="cheolsu"
      className="absolute w-[425px] h-[425px] top-[72%] left-[84%] -translate-x-1/2 -translate-y-1/2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
}