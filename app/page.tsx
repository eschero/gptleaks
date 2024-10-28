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
    <>
      {/* Contenitore dell'animazione */}
      <div
        id="container"
        className="relative flex h-screen w-screen items-center justify-center overflow-x-hidden"
        style={{
          background: 'linear-gradient(180deg, #141414, #111111)',
        }}
      >
        <div
          id="canvasContainer"
          className="relative flex items-center justify-center overflow-hidden border-2 border-[#222222] bg-[#222222] shadow-lg shadow-darkBlue-900/20 inset-4 sm:inset-6 lg:inset-12 rounded-3xl"
        >
          <canvas id="myCanvas" className="w-full"></canvas>
          <AsciiAnimation />
        </div>
      </div>

      {/* Contenitore dei post */}
      <Main posts={posts} />
    </>
  )
}
