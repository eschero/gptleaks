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
      <div className="left-[50%] right-[50%] mx-[-50vw] mb-8 h-screen w-screen">
        <div
          className="flex h-[85vh] w-full items-center justify-center overflow-x-hidden"
          style={{
            background: 'linear-gradient(180deg, #030712, #030712)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden border-2 border-[#181818] bg-[#141414] shadow-lg">
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
**  **__/_________  /___  / ___________ ___  /_________
*  / *_ ___  ** \\  **/_  /  *  * \\  __ \`/_  //_/_  ___/
 / /_/ / __  /_/ / /_ *  /*__/  __/ /_/ /_  ,<  *(*_  ) 
 \\____/  *  .*__/\\__/ /_____\\___/\\__,_/ /_/|_| /____/  
         /_/                                             `}
            </pre>
          </div>
        </div>
      </div>

      {/* Blog posts container */}
      <Main posts={posts} />
    </>
  )
}
