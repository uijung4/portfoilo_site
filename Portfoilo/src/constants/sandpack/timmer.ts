import type { SandpackExample } from "./types"

export const timmer: SandpackExample = {
    id: "timmer",
    title: "useInterval(useRef + useEffect)",
    template: "react-ts",
    dependencies: {},
    files: {
        "/App.tsx": {
            active: true,
            code: `import { useState, useEffect, useRef } from "react";

function App() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return; // 이미 타이머가 실행 중인 경우 무시

    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Count: {count}</h1>
      <button onClick={startTimer} style={{ marginRight: 10 }}>
        Start
      </button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

export default App;
`,
        },
    },
}


