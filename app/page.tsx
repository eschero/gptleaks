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
      className="relative flex h-[85vh] w-full items-center justify-center overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #222222, #111111)',
      }}
    >
      <div
        id="canvasContainer"
        className="absolute inset-[0.5rem] max-h-full w-[calc(100%-2rem)] overflow-hidden rounded-[1.5rem] border-2 border-[#181818] bg-[#141414] shadow-lg sm:inset-[1.5rem] sm:max-h-[85vh] sm:w-[calc(100%-3rem)] sm:rounded-[2rem] lg:inset-[3rem] lg:max-h-[85vh] lg:w-[calc(100%-6rem)] lg:rounded-[3rem]"
      >
        <canvas id="myCanvas" className="w-full"></canvas>
        <AsciiAnimation />
      </div>

      <Main posts={posts} />
    </div>
  )
}
