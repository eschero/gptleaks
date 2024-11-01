'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import type InitRotatingAscii from '@/components/asciiMorph'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const asciiContainer = useRef<HTMLPreElement>(null)
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  return (
    <div>
      <div
        style={{
          width: '100%',
          paddingTop: isMobile ? '60%' : '40%',
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
            overflow: 'hidden',
            margin: 0,
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
