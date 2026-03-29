import BackGround from '../../assets/images/background.svg'
import whiteboard from '../../assets/icons/whiteboard.svg'
import toy from '../../assets/icons/toy.svg'
import gitProject from '../../assets/icons/gitProject.svg'
import books from '../../assets/icons/books.svg'
import phone0 from '../../assets/icons/phone0.svg'
import phone1 from '../../assets/icons/phone1.svg'
import Img from '../../components/organisims/DynamicImg'
import TypewriterText from '../../components/molecules/TypewriterText'

type HotspotId = 'whiteboard' | 'toy' | 'projects' | 'books' | 'contact' | null

interface MainLayoutProps {
  activeHotspot: HotspotId
  onHotspotHover: (id: HotspotId) => void
  onHotspotClick: (id: Exclude<HotspotId, null>) => void
}

export default function MainLayout({
  activeHotspot,
  onHotspotHover,
  onHotspotClick,
}: MainLayoutProps) {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        src={BackGround}
        alt="Background"
        className="w-full h-full object-cover fixed inset-0 -z-10"
      />
      
      <div
        className="absolute top-[45%] left-[50%] w-[1000px] h-[650px] -translate-x-1/2 -translate-y-1/2"
        onMouseEnter={() => onHotspotHover('whiteboard')}
        onMouseLeave={() => onHotspotHover(null)}
      >
        <img src={whiteboard} alt="whiteboard" className="w-full h-full" />
        <div className="absolute top-[25%] left-[15%] w-[70%]">
          <TypewriterText activeHotspot={activeHotspot} />
        </div>
      </div>
      
      <Img
          src={toy}
          alt="toy"
          className="top-[86%] left-[16%] w-[250px] h-[250px]"
          onMouseEnter={() => onHotspotHover('toy')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('toy')}
          Effect={['hoverZoom', 'hoverLight']}
        />

      <Img
          src={gitProject}
          alt="projects"
          className="top-[88%] left-[34%] w-[180px] h-[180px]"
          onMouseEnter={() => onHotspotHover('projects')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('projects')}
          Effect={['hoverZoom', 'hoverLight']}
        />

      <Img
          src={books}
          alt="books"
          className="top-[88%] left-[68%] w-[200px] h-[200px]"
          onMouseEnter={() => onHotspotHover('books')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('books')}
          Effect={['hoverZoom', 'hoverLight']}
        />

      <Img
          src={activeHotspot === 'contact' ? phone1 : phone0}
          alt="contact"
          className="top-[94%] left-[84%] w-[150px] h-[150px]"
          onMouseEnter={() => onHotspotHover('contact')}
          onMouseLeave={() => onHotspotHover(null)}
          onClick={() => onHotspotClick('contact')}
          Effect={['hoverLight']}
        />
    </div>
  )
}