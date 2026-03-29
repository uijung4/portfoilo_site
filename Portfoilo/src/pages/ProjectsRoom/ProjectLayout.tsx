import type { ReactNode } from 'react'
import BackGround from '../../assets/images/background.svg'
import ProjectIcon from '../../components/organisims/ProjectIcon'
import CheolsuCharacter from '../../components/organisims/Cheolsu'
import ProjectBubble from '../../components/organisims/ProjectBubble'
import BackButton from '../../components/atoms/BackButton'

export interface ProjectItem {
  id: number
  title: string
  image: 'folder' | 'text'
  top: string
  left: string
  tech?: string
  features?: string[]
  emoji?: string
  url?: string
}

type ProjectsLayoutProps = {
  items: ProjectItem[]
  activeItemId: number
  isCharacterHovered: boolean
  isCharacterFirstHovered: boolean
  characterMessage: string
  onItemEnter: (id: number) => void
  onItemLeave: () => void
  onItemClick: (item: ProjectItem) => void
  onCharacterEnter: () => void
  onCharacterLeave: () => void
  onBackClick: () => void
  renderCharacterIntro?: ReactNode
}

export default function ProjectsLayout({
  items,
  activeItemId,
  isCharacterHovered,
  isCharacterFirstHovered,
  characterMessage,
  onItemEnter,
  onItemLeave,
  onItemClick,
  onCharacterEnter,
  onCharacterLeave,
  renderCharacterIntro,
}: ProjectsLayoutProps) {
  const activeItem = items.find((item) => item.id === activeItemId) ?? null
  const showBubble = activeItemId !== 0 || isCharacterHovered

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={BackGround}
        alt="projects background"
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />

    <BackButton />
     
      {items.map((item) => (
        <ProjectIcon
          key={item.id}
          image={item.image}
          title={item.title}
          top={item.top}
          left={item.left}
          onMouseEnter={() => onItemEnter(item.id)}
          onMouseLeave={onItemLeave}
          onClick={() => onItemClick(item)}
        />
      ))}

      <CheolsuCharacter
        showBubble={showBubble}
        onMouseEnter={onCharacterEnter}
        onMouseLeave={onCharacterLeave}
      />

      <ProjectBubble
        showBubble={showBubble}
        activeItem={activeItem}
        isCharacterHovered={isCharacterHovered}
        isCharacterFirstHovered={isCharacterFirstHovered}
        characterMessage={characterMessage}
        renderCharacterIntro={renderCharacterIntro}
      />
    </div>)
}