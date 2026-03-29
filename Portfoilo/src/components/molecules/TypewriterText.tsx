import Typewriter from 'typewriter-effect'

type HotspotId = 'whiteboard'| 'toy' | 'projects' | 'books' | 'contact' | null

interface TypewriterTextProps {
  activeHotspot: HotspotId
}

// 이걸 왜 여기에 적지..?
const mainPageTexts: Record<Exclude<HotspotId, null>, string> = {
  whiteboard: 'Welcome<br>',
  toy: '개발 중 <br> ...',
  projects: 'GitHub <br> 프로젝트',
  books: '학습 내용',
  contact: '연락',
}

export default function TypewriterText({ activeHotspot }: TypewriterTextProps) {
  if (!activeHotspot) return null
  return (
      <div className="font-mono text-[6rem] text-white w-[60%] text-left [font-family:'Patrick_Hand',cursive]
                      drop-shadow-[2px_2px_4px_rgba(255,255,255,0.5)]">
      <Typewriter
        key={activeHotspot}
        onInit={(typewriter) => {
          typewriter.typeString(mainPageTexts[activeHotspot]).start()
        }}
        options={{ delay: 60, cursor: '' }}
      />
    </div>
  )
}
