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
      <div className="mx-[10%] mb-[10%] mt-0 h-[85vh] w-[80%] flex items-center justify-center overflow-x-hidden">
        <div
          className="relative flex w-full h-full items-center justify-center overflow-hidden border-2 border-[#181818] bg-[#141414] shadow-lg"
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
      <div className="headbar mb-8 w-full h-12 bg-gray-800 flex items-center justify-center text-white text-xl">
        Headbar Content
      </div>

      {/* Blog posts container */}
      <Main posts={posts} />
    </>
  )
}
