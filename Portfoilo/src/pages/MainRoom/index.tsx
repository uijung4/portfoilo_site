import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import MainLayout from './MainLayout'

type HotspotId = 'whiteboard' | 'toy' | 'projects' | 'books' | 'contact' | null

export default function MainPage() {
  const navigate = useNavigate()
  const [activeHotspot, setActiveHotspot] = useState<HotspotId>(null)

  const handleHotspotClick = (id: Exclude<HotspotId, null>) => {
    if (id === 'projects') navigate('/projects')
    if (id === 'books') navigate('/books')
    if (id === 'contact') navigate('/contact')
    if (id === 'toy') {
      // 나중에 toy 페이지 생기면 연결
      console.log('toy clicked')
    }
  }

  return (
    <MainLayout
      activeHotspot={activeHotspot}
      onHotspotHover={setActiveHotspot}
      onHotspotClick={handleHotspotClick}
    />
  )
}