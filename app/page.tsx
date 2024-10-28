// Percorso: gptleaks-main/app/page.tsx
'use client'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import AsciiAnimation from '../components/AsciiAnimation'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <div
      id="container"
      className="relative flex h-[85vh] w-full overflow-x-hidden justify-center items-center"
      style={{
        background: 'linear-gradient(180deg, #222222, #111111)',
      }}
    >
      <div
        id="canvasContainer"
        className="absolute inset-[0.5rem] bg-[#141414] border-2 border-[#181818] rounded-[1.5rem] shadow-lg overflow-hidden w-[calc(100%-2rem)] max-h-full sm:inset-[1.5rem] sm:rounded-[2rem] sm:w-[calc(100%-3rem)] sm:max-h-[85vh] lg:inset-[3rem] lg:rounded-[3rem] lg:w-[calc(100%-6rem)] lg:max-h-[85vh]"
      >
        <canvas id="myCanvas" className="w-full"></canvas>
        <AsciiAnimation />
      </div>

      <Main posts={posts} />
    </div>
  )
}
