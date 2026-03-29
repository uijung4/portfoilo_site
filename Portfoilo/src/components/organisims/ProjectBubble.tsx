import type { ReactNode } from 'react'
import GrayBalloon from '../../assets/icons/gray_balloon.svg'
import type { ProjectItem } from '../../pages/ProjectsRoom/ProjectLayout'
import { getTechClassName } from '../../utils/techUtils'

interface ProjectBubbleProps {
  showBubble: boolean
  activeItem: ProjectItem | null
  isCharacterHovered: boolean
  isCharacterFirstHovered: boolean
  characterMessage: string
  renderCharacterIntro?: ReactNode
}

export default function ProjectBubble({
  showBubble,
  activeItem,
  isCharacterHovered,
  isCharacterFirstHovered,
  characterMessage,
  renderCharacterIntro,
}: ProjectBubbleProps) {

  return (
    <div
      className={[
        'absolute top-[40%] left-[52%] w-[900px] h-[900px]',
        '-translate-x-1/2 -translate-y-1/2',
        'transition-opacity duration-700 ease-in-out',
        'flex items-start justify-start',
        showBubble ? 'opacity-100' : 'opacity-0',
      ].join(' ')}
    >
      <img
        src={GrayBalloon}
        alt="gray balloon"
        className="absolute w-full h-full object-contain -z-10"
      />

      <div className="text-left w-2/3 h-2/3 mt-64 ml-16 overflow-y-auto pr-4">
        {activeItem && (
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-patrick font-bold text-gray-900">
              {activeItem.title} {activeItem.emoji ?? ''}
            </h1>

            {activeItem.tech && (
              <div className="flex flex-wrap gap-2">
                {activeItem.tech.split(',').map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span
                    key={t}
                    className={[
                      'inline-block px-4 py-2 rounded-lg shadow-sm',
                      'font-patrick text-lg font-medium border',
                      getTechClassName(t),
                    ].join(' ')}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {activeItem.features && activeItem.features.length > 0 && (
              <ul className="flex flex-col gap-2">
                {activeItem.features.map((f, i) => (
                  <li key={i} className="text-xl font-patrick text-gray-700 leading-relaxed">
                    - {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {isCharacterHovered && (
          <div className="flex flex-col gap-6">
            <h1 className="text-5xl font-patrick font-bold text-gray-900">
              {isCharacterFirstHovered ? (
                renderCharacterIntro ?? null
              ) : (
                <span className="text-4xl font-patrick whitespace-pre-line leading-relaxed block overflow-hidden">
                  {characterMessage}
                </span>
              )}
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
