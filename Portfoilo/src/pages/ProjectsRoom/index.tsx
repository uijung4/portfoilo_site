import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Typewriter from 'typewriter-effect'
import ProjectsLayout, { type ProjectItem } from './ProjectLayout'

const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: 1,
    title: '(초급) 다작 추천 사이트',
    image: 'folder',
    top: '20%',
    left: '6%',
    tech: 'Python',
    features: [
      'numpy 이외의 필수 라이브러리와 친숙해지는 시간',
      '생각 이상의 Pytorch 기술을 요구해 당황했던 프로젝트',
      '이론상 계발은 가능하지만 실전 성능은 보다 상위의 기술을 필요로 느 낌',
    ],
    emoji: '🎨',
    url: '',
  },
  // {
  //   id: 2,
  //   title: '(중급) 메뉴 결정 사이트',
  //   image: 'folder',
  //   top: '20%',
  //   left: '14%',
  //   tech: 'React',
  //   features: ['물리 엔진 오류로 고생 중...'],
  //   emoji: '🍽️',
  //   url: '',
  //   },
  {
    id: 2,
    title: '(중급) 반려동물 관리 앱',
    image: 'folder',
    top: '20%',
    left: '22%',
    tech: 'Dart, Pytorch',
    features: [
        '비교적 규모가 있는 협업 프로젝트',
        '역활 : 프론트 개발 및 질병 분류 모델 개발',
        'AI 모델은 데이터가 전부이며 비루한 데이터의 한계를 느낀 프로젝트'
    ],
    emoji: '🐶',
    url: '',
  },
  {
    id: 3,
    title: '(초급) 달무티 확률 계산기',
    image: 'text',
    top: '40%',
    left: '6%',
    tech: 'Numpy, Pandas',
    features: [
        '파이썬 필수 라이브러리 경험',
        '파이썬이 반복문에 얼마나 취약한 지를 경험한 프로젝트',
        '파이썬은 라이브러리가 본체임을 느끼게 해준 프로젝트',
    ],
    emoji: '🧮',
    url: '/projects/dalmuti',
  },
]

const CHEOLSU_MESSAGES = [
  '내가 수학 시험에서 오만가지 실수를 저질르는데 그건 출제자가 창의력이 없어서야!',
  '사람들이 영희랑 나랑 커플인줄 생각하는데 생물 시험지에 의하면 영희는 내 아내이자 남매이면서 부모이기도하고 자식이기도 해!',
  '나는 70년도 넘게 살았지만 물리 시험지에서 광속에 준하는 우주선을 많이 타고 다녀서 굉장히 젊어!',
  '기초 과학에 대해서 영희랑 민수랑 토론하는데 우리 셋 다 맞는 말을 하는 꼴을 본 적이 거의 없데',
  '사람들이 왜 소금물 가지고 장난 치냐고 뭐라 화내ㅠㅠ',
  '나는 양자적 성질을 가져서 다른 곳을 보고 있으면 여기 있으면서도 다른데 있을 수도 있어!'
]

export default function ProjectsPage() {
  const navigate = useNavigate()

  const [activeItemId, setActiveItemId] = useState(0)
  const [isCharacterHovered, setIsCharacterHovered] = useState(false)
  const [isCharacterFirstHovered, setIsCharacterFirstHovered] = useState(true)
  const [characterMessage, setCharacterMessage] = useState('')

  const characterIntro = useMemo(
    () => (
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString('안녕! 나는 철수야!')
            .pauseFor(1000)
            .deleteAll(30)
            .typeString('시험지에서 살고 있었는데 사람들이 너무 뭐라해서 여기로 도망쳤어!')
            .pauseFor(1000)
            .deleteAll(30)
            .typeString('왼쪽 아이콘들을 통해 프로젝트를 볼 수 있어!')
            .pauseFor(1000)
            .start()
        }}
        options={{
          autoStart: true,
          loop: false,
          delay: 90,
          cursor: '',
        }}
      />
    ),
    []
  )

  const handleItemClick = (item: ProjectItem) => {
    if (!item.url) return
    if (item.url.startsWith('/')) {
      navigate(item.url)
    } else {
      window.open(item.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCharacterLeave = () => {
    setIsCharacterHovered(false)

    if (!isCharacterFirstHovered) {
      const randomIndex = Math.floor(Math.random() * CHEOLSU_MESSAGES.length)
      setCharacterMessage(CHEOLSU_MESSAGES[randomIndex])
      return
    }

    setIsCharacterFirstHovered(false)
  }

  return (
    <ProjectsLayout
      items={PROJECT_ITEMS}
      activeItemId={activeItemId}
      isCharacterHovered={isCharacterHovered}
      isCharacterFirstHovered={isCharacterFirstHovered}
      characterMessage={characterMessage}
      onItemEnter={setActiveItemId}
      onItemLeave={() => setActiveItemId(0)}
      onItemClick={handleItemClick}
      onCharacterEnter={() => setIsCharacterHovered(true)}
      onCharacterLeave={handleCharacterLeave}
      onBackClick={() => navigate(-1)}
      renderCharacterIntro={characterIntro}
    />
  )
}