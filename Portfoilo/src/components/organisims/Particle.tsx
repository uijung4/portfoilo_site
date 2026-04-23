import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const Particle = () => {
  const [init, setInit] = useState(false);

  // 1. 엔진 초기화: 앱 생명주기 동안 한 번만 실행됩니다.
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); 
    }).then(() => {
      setInit(true);
    });
  }, []);

  // 2. 파티클 설정: 낮은 밀도 + 느린 관성 + hover 반응 + 비동기 밝기 변화
  const options: ISourceOptions = useMemo(() => ({
    fullScreen: {
      enable: false,
    },
    background: {
      color: { value: "#ffffff" },
    },
    detectRetina: true,
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: { enable: false, mode: "push" },
        onHover: { enable: true, mode: "bubble" },
        resize: { enable: true },
      },
      modes: {
        bubble: {
          distance: 200,
          size: 4,
          duration: 2,
          opacity: 0.8,
        },
        push: {
          quantity: 2,
        },
      },
    },
    particles: {
      color: {
        value: ["#dfe8ff", "#9eb8ff", "#7ef0ff"],
      },
      links: {
        color: "#cfdcff",
        distance: 130,
        enable: true,
        opacity: 0.4,
        width: 0.7,
      },
      move: {
        enable: true,
        speed: {
          min: 0.1,
          max: 0.3,
        },
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "bounce",
        },
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 480,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.7,
        },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1.6, max: 3.2 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
    },
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0"
    />
  );
};

export default Particle;