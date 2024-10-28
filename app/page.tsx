// Percorso: gptleaks-main/app/page.tsx
'use client'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <>
      {/* Contenitore dell'ASCII art */}
      <div
        id="container"
        className="relative flex h-[85vh] w-full items-center justify-center overflow-x-hidden"
        style={{
          background: 'linear-gradient(180deg, #030712, #030712)',
        }}
      >
        <div
          id="asciiArtContainer"
          className="absolute inset-[0.5rem] max-h-full w-[calc(100%-2rem)] overflow-hidden rounded-[1.5rem] border-2 border-[#181818] bg-[#141414] shadow-lg sm:inset-[1.5rem] sm:max-h-[85vh] sm:w-[calc(100%-3rem)] sm:rounded-[2rem] lg:inset-[3rem] lg:max-h-[85vh] lg:w-[calc(100%-6rem)] lg:rounded-[3rem] flex items-center justify-center"
        >
          <pre
            style={{
              color: '#40CFFF', // Modifica il colore dell'ASCII art qui
              fontFamily: 'monospace',
              fontSize: '16px',
              textAlign: 'center',
              lineHeight: '1.2',
              whiteSpace: 'pre',
            }}
          >
            {`_________       ___________             ______         
__  ____/_________  /___  / ___________ ___  /_________
_  / __ ___  __ \\  __/_  /  _  _ \\  __ \`/_  //_/_  ___/
 / /_/ / __  /_/ / /_ _  /___/  __/ /_/ /_  ,<  _(__  ) 
 \\____/  _  .___/\\__/ /_____\\___/\\__,_/ /_/|_| /____/  
         /_/                                             `}
          </pre>
        </div>
      </div>

      {/* Contenitore dei post */}
      <Main posts={posts} />
    </>
  )
}
