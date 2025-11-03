import type { Metadata } from "next";
import "./globals.css";
import { ParticleBackground } from "@/components/background/particle-background";

export const metadata: Metadata = {
  title: "ugly-custard",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-ash-600 text-ash-300">
        <div
          className="grid-pattern absolute top-0 left-0 h-full w-full"
          aria-hidden="true"
        />

        <div
          className="grain-noise pointer-events-none fixed top-0 size-[300%]"
          aria-hidden="true"
        />

        <ParticleBackground quantity={500} size={0.4} />

        <div className="flex min-h-screen items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
