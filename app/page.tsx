'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const asciiContainer = useRef<HTMLPreElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const initAscii = async () => {
      try {
        if (asciiContainer.current) {
          const rotatingAscii = await import('@/components/asciiMorph')
          cleanup = rotatingAscii.default(asciiContainer.current, theme)
        }
      } catch (error) {
        console.error('Error initializing ASCII:', error)
      }
    }

    initAscii()

    return () => {
      if (typeof cleanup === 'function') {
        cleanup()
      }
    }
  }, [theme])

  useEffect(() => {
    const handleResize = () => {
      if (asciiContainer.current) {
        const containerWidth = asciiContainer.current.clientWidth
        const containerHeight = asciiContainer.current.clientHeight
        const fontSize = Math.min(containerWidth / 100, containerHeight / 40) * 0.85
        asciiContainer.current.style.fontSize = `${fontSize}px`
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      <div
        style={{
          width: '100%',
          paddingTop: '50%', // modificato da 40% per una migliore proporzione
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
            fontFamily: 'courier, monospace',
            textAlign: 'center',
            backgroundColor: 'transparent',
            padding: '10px',
            lineHeight: '1.2', // miglioramento leggibilità
            overflow: 'hidden',
            margin: 0,
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
