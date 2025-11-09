import { reiAscii } from './rei-ascii'
import { getRandomLainQuote, type LainQuote } from '@/utils/lain-quotes'
import { User, MapPin, Briefcase, Code2, Package, Folder, Info, Heart, Mail, Linkedin, MessageCircle } from 'lucide-react'

interface FastfetchDisplayProps {
  quote?: LainQuote
}

export function FastfetchDisplay({ quote: propQuote }: FastfetchDisplayProps) {
  const asciiLines = reiAscii.split('\n')
  const quote = propQuote || getRandomLainQuote()

  return (
    <div className="text-sm">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* ASCII Art */}
        <div className="text-cyan leading-snug whitespace-pre text-xs tracking-tighter">
          {asciiLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>

        {/* System Info */}
        <div className="flex flex-col justify-center gap-3">
          {/* Personal Info */}
          <div>
            <div className="flex items-center gap-2">╭─ <User className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">ugly@custard</span></div>
            <div className="flex items-center gap-2">├─ <MapPin className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">Mumbai, India / UTC+5:30</span></div>
            <div className="flex items-center gap-2">├─ <Briefcase className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">Full-Stack Developer &amp; AI Enthusiast</span></div>
            <div className="flex items-center gap-2">├─ <Code2 className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">NeoVim</span></div>
            <div className="flex items-center gap-2">├─ <Package className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">X projects, Y articles</span></div>
            <div className="flex items-center gap-2">╰─ <Heart className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">Anime, Manga, Terminal UIs</span></div>
          </div>

          {/* Contact & Links */}
          <div>
            <div className="flex items-center gap-2">╭─ <Mail className="w-3 h-3 text-cyan inline" /> : <a href="mailto:himanshu.mishra1123@gmail.com" className="text-ash-300 hover:text-cyan transition-colors underline">himanshu.mishra1123@gmail.com</a></div>
            <div className="flex items-center gap-2">├─ <Linkedin className="w-3 h-3 text-cyan inline" /> : <a href="https://www.linkedin.com/in/himanshu-mishra1123/" target="_blank" rel="noopener noreferrer" className="text-ash-300 hover:text-cyan transition-colors underline">linkedin.com/in/himanshu-mishra1123</a></div>
            <div className="flex items-center gap-2">├─ <MessageCircle className="w-3 h-3 text-cyan inline" /> : <a href="https://discord.gg/ffmwpfnm" target="_blank" rel="noopener noreferrer" className="text-ash-300 hover:text-cyan transition-colors underline">@uglycustard</a></div>
            <div className="flex items-center gap-2">├─ <Folder className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">/home/ugly/</span></div>
            <div className="flex items-center gap-2">╰─ <Info className="w-3 h-3 text-cyan inline" /> : <span className="text-ash-300">Type &apos;help&apos; for commands</span></div>
          </div>

          {/* Lain quote - English and Japanese */}
          <div className="text-ash-500 text-xs border-l-2 border-cyan pl-3 mt-2 space-y-1 italic">
            <div>&ldquo;{quote.eng}&rdquo;</div>
            <div>「{quote.jap}」</div>
          </div>
        </div>
      </div>
    </div>
  )
}
