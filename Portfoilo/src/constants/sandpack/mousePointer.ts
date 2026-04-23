import type { SandpackExample } from "./types"

export const mousePointer: SandpackExample = {
  id: "mousePointer",
  title: "useState vs Signals",
  template: "react-ts",
  dependencies: {
    "@preact/signals-react": "^2.2.0",
  },
  files: {
    "/App.tsx": {
      active: true,
      code: `import { useRef, useState } from "react";
import { computed, signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import type { MouseEvent } from "react";

const posX = signal(0);
const posY = signal(0);
const roundedX = computed(() => Math.round(posX.value));
const roundedY = computed(() => Math.round(posY.value));

function StateVersion() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMove}
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        border: "2px solid #0ea5e9",
        borderRadius: 12,
        background: "#f0f9ff",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 12 }}>
        <strong>useState</strong>
        <p>렌더: {renderCount.current}</p>
        <p>좌표: {Math.round(pos.x)}, {Math.round(pos.y)}</p>
      </div>
      <div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#0ea5e9",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function SignalReadout() {
  useSignals();

  return (
    <p>
      좌표: {roundedX.value}, {roundedY.value}
    </p>
  );
}

function SignalDot() {
  useSignals();

  return (
    <div
      style={{
        position: "absolute",
        left: posX.value,
        top: posY.value,
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: "#f59e0b",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />
  );
}

function SignalVersion() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    posX.value = e.clientX - rect.left;
    posY.value = e.clientY - rect.top;
  };

  return (
    <div
      onMouseMove={handleMove}
      style={{
        position: "relative",
        width: "100%",
        height: 300,
        border: "2px solid #f59e0b",
        borderRadius: 12,
        background: "#fffbf0",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: 12 }}>
        <strong>Signals (Optimized)</strong>
        <p>렌더: {renderCount.current}</p>
        <SignalReadout />
      </div>
      <SignalDot />
    </div>
  );
}

export default function App() {
  return (
    <main style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>useState vs Signals 비교</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <StateVersion />
        <SignalVersion />
      </div>
    </main>
  );
}
`,
    },
"/index.tsx": {
  code: `import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);
`,
    },
  },
}
