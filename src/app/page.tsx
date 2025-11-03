import { TerminalWindow } from "@/components/terminal/terminal-window";

export default function Home() {
  return (
    <TerminalWindow>
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold text-cyan-400">Welcome to Portfolio</h1>
        <p className="mt-4 text-gray-300">Terminal-style developer portfolio</p>
        <div className="mt-8 space-y-2 text-sm text-gray-500">
          <p>• Draggable window (desktop)</p>
          <p>• Double-click header for fullscreen</p>
          <p>• Green button toggles fullscreen</p>
        </div>
      </div>
    </TerminalWindow>
  );
}
