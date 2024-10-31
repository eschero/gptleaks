'use client'

import { useEffect, useRef, useState } from 'react'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const asciiContainer = useRef<HTMLPreElement>(null)
  const [fontSize, setFontSize] = useState('16px')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // mobile breakpoint
        setFontSize('8px') // font più piccolo per mobile
      } else {
        setFontSize('16px') // font normale per desktop
      }
    }

    // Inizializza il font size
    handleResize()

    // Aggiungi event listener per il resize
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const initAscii = async () => {
      if (asciiContainer.current) {
        const { default: AsciiMorph } = await import('@/components/asciiMorph')

        const element = asciiContainer.current
        AsciiMorph(element, { x: 50, y: 25 })

        const logo1 = [
          ' _____________________________.__                 __            ',
          '/  _____/\\______   \\__    ___/|  |   ____ _____  |  | __  ______',
          '/   \\  ___ |     ___/ |    |   |  | _/ __ \\\\__  \\ |  |/ / /  ___/',
          '\\    \\_\\  \\|    |     |    |   |  |_\\  ___/ / __ \\|    <  \\___ \\ ',
          ' \\______  /|____|     |____|   |____/\\___  >____  /__|_ \\/____  >',
          '        \\/                               \\/     \\/     \\/     \\/ ',
        ]

        const logo2 = [
          '.------..------..------..------..------..------..------..------.',
          '|G.--. ||P.--. ||T.--. ||L.--. ||E.--. ||A.--. ||K.--. ||S.--. |',
          '| :/\\: || :/\\: || :/\\: || :/\\: || (\\/) || (\\/) || :/\\: || :/\\: |',
          '| :\\/: || (__) || (__) || (__) || :\\/: || :\\/: || :\\/: || :\\/: |',
          "| '--'G|| '--'P|| '--'T|| '--'L|| '--'E|| '--'A|| '--'K|| '--'S|",
          "`------'`------'`------'`------'`------'`------'`------'`------'",
        ]

        // Render iniziale
        AsciiMorph.render(logo1)

        // Funzione per alternare tra le due immagini
        let currentImage = 'logo1'
        const toggleAscii = () => {
          if (currentImage === 'logo1') {
            AsciiMorph.morph(logo2)
            currentImage = 'logo2'
          } else {
            AsciiMorph.morph(logo1)
            currentImage = 'logo1'
          }
        }

        // Crea un intervallo per alternare ogni 4 secondi
        const intervalId = setInterval(toggleAscii, 4000)

        // Pulizia quando il componente viene smontato
        return () => clearInterval(intervalId)
      }
    }

    initAscii()
  }, [])

  return (
    <div>
      <pre
        ref={asciiContainer}
        style={{
          fontFamily: 'monospace',
          textAlign: 'center',
          margin: '20px 0',
          backgroundColor: 'transparent',
          color: '#ff0000',
          padding: '20px',
          lineHeight: '1.2',
          overflow: 'hidden',
          minHeight: '300px',
          fontSize: fontSize, // usa il fontSize dinamico
          whiteSpace: 'pre', // mantiene la formattazione ASCII
          display: 'block', // assicura che occupi tutto lo spazio disponibile
          width: '100%', // occupa tutta la larghezza disponibile
        }}
      ></pre>
      <Main posts={posts} />
    </div>
  )
}
