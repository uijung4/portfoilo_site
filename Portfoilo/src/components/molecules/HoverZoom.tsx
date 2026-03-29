interface HoverZoomProps {
  children: React.ReactNode
}

export default function HoverZoom({ children }: HoverZoomProps) {
  return (
    <div className="w-full h-full transition-transform duration-300 ease-out hover:scale-110">
      {children}
    </div>
  )
}