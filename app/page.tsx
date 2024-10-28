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
      className="relative z-10 h-screen w-screen"
      style={{ background: 'linear-gradient(180deg, #141414, #111111)' }}
    >
      <div
        id="canvasContainer"
        className="relative flex items-center justify-center overflow-hidden border-2 border-[#222222] bg-[#222222] shadow-lg shadow-darkBlue-900/20 inset-4 sm:inset-6 lg:inset-12 rounded-3xl"
      >
        <canvas id="myCanvas" className="w-full"></canvas>
        <AsciiAnimation />

        <a href="#wp--skip-link--target" className="btn-scroll">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            height="20"
            className="inline text-slate-100"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
          </svg>
        </a>
      </div>

      <Main posts={posts} />
    </div>
  )
}
