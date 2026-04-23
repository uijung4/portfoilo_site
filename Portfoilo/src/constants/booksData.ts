export type ContentItem = {
  id: string
  title: string
  description: string
  sandboxExampleId?: string
  showSandbox?: boolean
  code?: string
}

export type Section = {
  id: string
  slug: string
  path: string
  title: string
  mainTech?: string
  items: ContentItem[]
  fqa?: string[]
}

export type TechTheme = {
  id: string
  label: string
  basePath: string
  defaultSectionSlug: string
  theme: {
    primary: string       // 주 배경색 (탭 활성, 버튼 등)
    secondary: string     // 보조 색상 (사이드바 배경)
    accent: string        // 강조 색상 (활성 사이드바 항목)
    text: string          // 기본 텍스트 색
    textLight: string     // 밝은 텍스트 (primary 배경 위)
    border: string        // 테두리 색
  }
  sections: Section[]
}

export const TECH_DATA: TechTheme[] = [
  {
    id: "react",
    label: "React",
    basePath: "/books/react",
    defaultSectionSlug: "mouse-pointer",
    theme: {
      primary: "bg-sky-400",
      secondary: "bg-sky-50",
      accent: "bg-sky-200 text-sky-800",
      text: "text-sky-900",
      textLight: "text-white",
      border: "border-sky-200",
    },
    sections: [
      {
        id: "mouse-pointer",
        slug: "mouse-pointer",
        path: "/books/react/mouse-pointer",
        title: "마우스 포인터",
        mainTech: "Signal",
        items: [
          {
            id: "mouse-pointer",
            title: "Sandpack 미리보기",
            description: "아래 에디터에서 코드를 수정하면 오른쪽 미리보기에 즉시 반영됩니다.",
            sandboxExampleId: "mousePointer",
            showSandbox: true,
          },
        ],
        fqa: [
            "Q: Signal이 무엇인가요?",
            "A: Signal은 React의 상태 관리보다 더 가볍고 빠르며, 랜더링을 유발하지 않아 고빈도(High-frequency)의 데이터를 처리할 때 사용됩니다.",
            "Q: useState 대신 굳이 Signal을 사용하면 어떤 이점이 있나요",
            "A: 마우스 위치와 같이 자주 업데이트되는 상태에서 useState는 상태가 변경될 때마다 컴포넌트를 다시 렌더링하지만, Signal은 필요한 부분만 업데이트하여 성능을 향상시킵니다.",
            "Q: Signal의 단점은 무엇인가요?",
            "A: Signal은 React에서 추구하는 회복가능한 컴포넌트와 다소 거리가 있습니다. React의 단방향 데이터 흐름, 컴포넌트 트리 구조와는 맞지 않아 남발 시 유지보수 및 디버깅에 어려움이 있을 수 있습니다.",
            "Q: 마우스 포인터를 useState로 구현해야 할 때가 있나요?",
            "A: 다른 UI 컴포넌트와 호환되거나 여러 UI와 결합할 때, 표준 라이브러리와 함께 사용할 때에는 안정성 있는 useState가 더 적합합니다.",
        ],
      },
      {
        id: "timmer",
        slug: "timmer",
        path: "/books/react/timmer",
        title: "타이머",
        mainTech: "useInterval(useRef + useEffect)",
        items: [
          {
            id: "timmer",
            title: "Sandpack 미리보기",
            description: "아래 에디터에서 코드를 수정하면 오른쪽 미리보기에 즉시 반영됩니다.",
            sandboxExampleId: "timmer",
            showSandbox: true,
          },
        ],
      },
    ],
  },

  {
    id: "python",
    label: "Python",
    basePath: "/books/python",
    defaultSectionSlug: "basics",
    theme: {
      primary: "bg-yellow-400",
      secondary: "bg-yellow-50",
      accent: "bg-yellow-200 text-yellow-900",
      text: "text-blue-500",
      textLight: "text-blue-50",
      border: "border-yellow-200",
    },
    sections: [
      {
        id: "python-basics",
        slug: "basics",
        path: "/books/python/basics",
        title: "기본 문법",
        items: [],
      },
      {
        id: "python-oop",
        slug: "oop",
        path: "/books/python/oop",
        title: "OOP",
        items: [],
      },
      {
        id: "python-stdlib",
        slug: "stdlib",
        path: "/books/python/stdlib",
        title: "표준 라이브러리",
        items: [],
      },
      {
        id: "python-data",
        slug: "data-analysis",
        path: "/books/python/data-analysis",
        title: "데이터 분석",
        items: [],
      },
    ],
  },
]

export const getTechById = (id: string): TechTheme | undefined =>
  TECH_DATA.find((tech) => tech.id === id)

export const getTechBySectionPath = (path: string): TechTheme | undefined =>
  TECH_DATA.find((tech) => path.startsWith(tech.basePath))

export const getSectionBySlug = (
  techId: string,
  slug: string,
): Section | undefined =>
  TECH_DATA.find((tech) => tech.id === techId)?.sections.find(
    (section) => section.slug === slug,
  )
