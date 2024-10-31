// page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const asciiContainer = useRef<HTMLPreElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const initAscii = async () => {
      if (asciiContainer.current) {
        const { default: initRotatingAscii } = await import('@/components/asciiMorph')
        cleanup = initRotatingAscii(asciiContainer.current)
      }
    }

    initAscii()

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [])

  return (
    <div>
      <div
        style={{
          width: '100%',
          paddingTop: '30%', // Aspect ratio 100:30
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <pre
          ref={asciiContainer}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            fontFamily: 'courier',
            textAlign: 'center',
            backgroundColor: 'transparent',
            color: '#ffffff',
            padding: '10px',
            lineHeight: '1',
            overflow: 'hidden',
            margin: 0,
            fontSize: 'calc(0.4vw + 2px)', // Modificato solo questo valore da 0.7vw a 0.5vw
            whiteSpace: 'pre',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </div>
      <Main posts={posts} />
    </div>
  )
}
