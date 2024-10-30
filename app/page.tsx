'use client'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return (
    <>
      {/* Full-width ASCII art container */}
      <div className="mx-[10%] mb-[10%] mt-0 flex h-[85vh] w-[80%] items-center justify-center overflow-x-hidden">
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden border-2 border-[#181818] bg-[#141414] shadow-lg"
          style={{
            background: 'linear-gradient(180deg, #030712, #030712)',
          }}
        >
          <pre
            style={{
              color: '#40CFFF',
              fontFamily: 'monospace',
              fontSize: '16px',
              textAlign: 'center',
              lineHeight: '1.2',
              whiteSpace: 'pre',
            }}
          >
            {`_________       ___________             ______         
**  /**_______  /___  / ___________ ___  /_________
*  / _*_  ** \\  **/_  /  *  * \\  __ \`/_  //_/_  ___/
 / /_/ / __  /_/ / /_ *  /*__/  __/ /_/ /_  ,<  *(*_  ) 
 \\____/  *  .*__/\\__/ /_____\\___/\\__,_/ /_/|_| /____/  
         /_/                                             `}
          </pre>
        </div>
      </div>

      {/* Headbar */}
      <div className="flex h-12 w-full items-center justify-center bg-gray-800 text-xl text-white mb-8">
        Headbar Content
      </div>

      {/* Blog posts container */}
      <Main posts={posts} />
    </>
  )
}
