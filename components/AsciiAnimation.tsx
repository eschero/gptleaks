'use client'
import { useEffect } from 'react'

const AsciiAnimation = () => {
  useEffect(() => {
    'use strict'

    const CHAR = '    `~._^|\',-!:}+{=/*;[]7oc><i?)(rlt1jsIz3vCuJ%5aYn"298e0f&L6OS$VGZxTyUhP4wkDFdgqbRpmX@QAEHK#BNWM'
    const MAX = CHAR.length * 2 - 2
    const FRAMES = 300
    const BLUR_STEPS = 40

    let canvas, ctx, font_size, char_width, char_height
    let canvas_width, canvas_height
    let wave_map

    function calculateDimensions() {
      const container = document.getElementById('canvasContainer')
      const canvasElement = document.getElementById('myCanvas')

      if (container && canvasElement) {
        canvas = canvasElement
        ctx = canvas.getContext('2d')

        canvas.width = container.clientWidth
        canvas.height = container.clientHeight

        font_size = Math.floor(canvas.width / 100) 
        char_width = Math.ceil(font_size * 0.6)
        char_height = Math.ceil(font_size)

        canvas_width = Math.ceil(canvas.width / char_width)
        canvas_height = Math.ceil(canvas.height / char_height)
      }
    }

    function initializeWaveMap() {
      wave_map = new Array(canvas_height)
      for (let y = 0; y < canvas_height; y++) {
        wave_map[y] = new Array(canvas_width).fill(0).map(() => Math.random() * MAX)
      }

      for (let step = 0; step < BLUR_STEPS; ++step) {
        for (let y = 0; y < canvas_height; ++y) {
          for (let x = 0; x < canvas_width; ++x) {
            const value = wave_map[y][x]
            const left = wave_map[y][x - 1] || value
            const right = wave_map[y][x + 1] || value
            const top = (wave_map[y - 1] || [])[x] || value
            const bottom = (wave_map[y + 1] || [])[x] || value
            wave_map[y][x] = (value + left + right + top + bottom) / 5
          }
        }
      }
    }

    function setup() {
      calculateDimensions()
      initializeWaveMap()
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${font_size}px monospace`

      for (let y = 0; y < canvas_height; ++y) {
        for (let x = 0; x < canvas_width; ++x) {
          const wave_char = CHAR[Math.floor(wave_map[y][x]) % CHAR.length]
          ctx.fillStyle = 'rgba(22, 38, 79, 0.8)'
          ctx.fillText(wave_char, x * char_width, (y + 1) * char_height)
          wave_map[y][x] = (wave_map[y][x] + 0.4) % CHAR.length
        }
      }

      requestAnimationFrame(draw)
    }

    function init() {
      setup()
      requestAnimationFrame(draw)
    }

    init()
    window.addEventListener('resize', setup)

    return () => {
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <div
      id="canvasContainer"
      className="shadow-darkBlue-900/20 relative inset-4 flex items-center justify-center overflow-hidden rounded-3xl border-2 border-[#222222] bg-[#222222] shadow-lg sm:inset-6 lg:inset-12"
    >
      <canvas id="myCanvas" className="w-full"></canvas>
    </div>
  )
}

export default AsciiAnimation
