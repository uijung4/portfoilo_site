import Typewriter from "typewriter-effect"
import { useDeferredValue, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react"
import Particle from "../../components/organisims/Particle"
import BackButton from "../../components/atoms/BackButton"
import { TECH_DATA, getSectionBySlug, getTechById } from "../../constants/booksData"
import { getBooksSandpackExampleById } from "../../constants/sandpack"

export default function BookLayout() {
  const [isIntroDone, setIsIntroDone] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const contentSectionRef = useRef<HTMLElement | null>(null)
  const navigate = useNavigate()
  const { techId, sectionSlug } = useParams()


  const activeTech = getTechById(techId ?? "") ?? TECH_DATA[0]
  const activeSection =
    getSectionBySlug(activeTech.id, sectionSlug ?? "") ?? activeTech.sections[0]
  
  // 검색 최적화
  const deferredSearchQuery = useDeferredValue(searchQuery)
  const normalizedQuery = deferredSearchQuery.trim().toLowerCase()
  const visibleSections = activeTech.sections
    .map((section) => {
      if (!normalizedQuery) return section

      const matchesSection = section.title.toLowerCase().includes(normalizedQuery)
        || section.mainTech?.toLowerCase().includes(normalizedQuery)

      const filteredItems = section.items.filter((item) => {
        const target = `${item.title} ${item.description}`.toLowerCase()
        return target.includes(normalizedQuery)
      })

      if (matchesSection) {
        return section
      }

      if (filteredItems.length > 0) {
        return {
          ...section,
          items: filteredItems,
        }
      }

      return null
    })
    .filter((section) => section !== null)

  const displayedSections = normalizedQuery
    ? visibleSections
    : [activeSection]

  useEffect(() => {
    // 초기 배경화면용
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSidebarVisible(entry.isIntersecting)
      },
      { threshold: 0.2 }
    )
    // 스크롤 후 사이드바 보여주기용
    if (contentSectionRef.current) {
      observer.observe(contentSectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!techId || !sectionSlug) {
      navigate(activeSection.path, { replace: true })
      return
    }

    const hasValidTech = activeTech.id === techId
    const hasValidSection = activeSection.slug === sectionSlug

    if (!hasValidTech || !hasValidSection) {
      navigate(activeSection.path, { replace: true })
    }
  }, [activeSection.path, activeSection.slug, activeTech.id, navigate, sectionSlug, techId])

  return (
    <div className="w-full">
      <BackButton />
      {/* 초기 소개 화면 */}
      <section className="relative min-h-screen overflow-hidden">
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${
            isIntroDone ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Particle /> {/* typing후 배경 */}
        </div>
        <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center text-8xl font-bold text-black">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
              .typeString(`임페리얼 <br> 프로그래밍 <br> 노트`)
              .callFunction(() => setIsIntroDone(true)) // 타이핑 소개 끝
              .start()
            }}
            options={{
              autoStart: true,
              loop: false,
              cursor: '|',
            }}
          />
          <button
            className={`mt-12 px-6 py-3 text-xl font-semibold rounded-full bg-gray-800 text-white transition-opacity duration-500 ${
              isIntroDone ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
            }}
          >
            학습하기
          </button>
        </div>
      </section>

      {/* Content Section - 사이드바 레이아웃 */}
      <section ref={contentSectionRef} className="flex w-full min-h-screen bg-white">
        <aside
          className={`w-full max-w-xs sticky top-0 h-screen overflow-y-auto border-r p-6 transition-all duration-500 ${activeTech.theme.secondary} ${activeTech.theme.border} ${
            isSidebarVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          <p className={`text-sm font-semibold uppercase tracking-[0.25em] ${activeTech.theme.text}`}>
            {activeTech.label}
          </p>
          <h3 className={`mt-3 text-2xl font-bold ${activeTech.theme.text}`}>Sections</h3>
          <ul className="mt-8 space-y-3 text-gray-700">
            {activeTech.sections.map((section) => {
              const isActive = section.id === activeSection.id

              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => navigate(section.path)}
                    className={`w-full rounded-2xl border px-4 py-3 text-left transition ${activeTech.theme.border} ${
                      isActive
                        ? `${activeTech.theme.accent} shadow-sm`
                        : "bg-white/70 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <div className="text-sm font-semibold">{section.title}</div>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>

        <main className="min-h-screen flex-1 bg-white">
          <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-6 py-5 backdrop-blur md:px-10">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className={`mt-2 text-3xl font-bold ${activeTech.theme.text}`}>
                  {activeSection.title}
                </h2>
              </div>

              <div className="flex flex-col gap-4 xl:min-w-[36rem] xl:items-end">
                <div className="flex flex-wrap gap-3">
                  {TECH_DATA.map((tech) => {
                    const isActive = tech.id === activeTech.id

                    return (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => navigate(`${tech.basePath}/${tech.defaultSectionSlug}`)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${tech.theme.border} ${
                          isActive
                            ? `${tech.theme.primary} ${tech.theme.textLight} shadow-md`
                            : "bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {tech.label}
                      </button>
                    )
                  })}
                </div>

                <label className="relative block w-full xl:max-w-md">
                  <span className="sr-only">검색</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={`${activeTech.label} 안에서 topic 검색`}
                    className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 md:px-10">
            <div className="grid gap-6">
              {displayedSections.length > 0 ? (
                displayedSections.map((section) => (
                  <article
                    key={section.id}
                    className={`rounded-[2rem] border bg-white p-8 shadow-sm transition ${activeTech.theme.border}`}
                  >
                    <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                          {activeTech.label}
                        </p>
                        <h3 className={`mt-2 text-2xl font-bold ${activeTech.theme.text}`}>
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-slate-500">핵심 기술 : {section.mainTech}</p>

                    <div className="mt-8 grid gap-4 lg:grid-cols-2">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-3xl border p-5 ${activeTech.theme.secondary} ${activeTech.theme.border} ${
                            item.showSandbox ? "lg:col-span-2" : ""
                          }`}
                        >
                          <h4 className={`text-lg font-semibold ${activeTech.theme.text}`}>
                            {item.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {item.description}
                          </p>

                          {item.showSandbox && item.sandboxExampleId ? (
                            (() => {
                              const sandboxExample = getBooksSandpackExampleById(item.sandboxExampleId)

                              if (!sandboxExample) {
                                return (
                                  <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                                    Sandpack 예제를 찾을 수 없습니다. (id: {item.sandboxExampleId})
                                  </p>
                                )
                              }

                              return (
                                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                  <SandpackProvider
                                    template={sandboxExample.template}
                                    files={sandboxExample.files}
                                    theme="light"
                                    customSetup={
                                      sandboxExample.dependencies
                                        ? { dependencies: sandboxExample.dependencies }
                                        : undefined
                                    }
                                  >
                                    <SandpackLayout>
                                      <SandpackCodeEditor
                                        showTabs
                                        showLineNumbers
                                        wrapContent
                                        style={{ height: 420 }}
                                      />
                                      <SandpackPreview
                                        showOpenInCodeSandbox={false}
                                        showRefreshButton
                                        style={{ height: 420 }}
                                      />
                                    </SandpackLayout>
                                  </SandpackProvider>
                                </div>
                              )
                            })()
                          ) : null}
                        </div>
                      ))}
                    </div>

                    {section.fqa && section.fqa.length > 0 && (
                      <div className={`mt-8 rounded-2xl border p-6 ${activeTech.theme.secondary} ${activeTech.theme.border}`}>
                        <h4 className={`text-lg font-bold mb-4 ${activeTech.theme.text}`}>FQA</h4>
                        <ul className="space-y-2">
                          {section.fqa.map((line, idx) => (
                            <li
                              key={idx}
                              className={`text-sm leading-6 whitespace-pre-wrap ${
                                line.startsWith("Q") ? `font-semibold ${activeTech.theme.text}` : "text-slate-600 pl-4"
                              }`}
                            >
                              {line}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <div className="rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 px-8 py-16 text-center text-slate-500">
                  검색 결과가 없습니다. 다른 키워드나 다른 기술 탭을 선택해 보세요.
                </div>
              )}
            </div>
          </div>
        </main>
      </section>
    </div>
  )
}
