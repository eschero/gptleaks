// Percorso: gptleaks-main/components/AsciiAnimation.tsx
'use client'
import { useEffect } from 'react'

const AsciiAnimation = () => {
  useEffect(() => {
    'use strict'

    const CHAR =
      ' ~._^|\',-!:}+{=/*;[]7oc><i?)(rlt1jsIz3vCuJ%5aYn"298e0f&L6OS$VGZxTyUhP4wkDFdgqbRpmX@QAEHK#BNWM'
    const MAX = CHAR.length * 2 - 2
    const FRAMES = 600
    const BLUR_STEPS = 40
    const EXPANSION_FRAMES = 240
    const TRANSITION_FRAMES = 150
    const OPACITY_START_OFFSET = 100
    const MARGIN_PERCENTAGE = 20

    let canvas, ctx, font_size, char_width, char_height
    let canvas_width, canvas_height
    let wave_map
    let expansion_progress = 0
    let transition_completed = false

    const CUSTOM_TEXT = [
      '____    ____                                                   ',
      "MM'    MM'                                                   ",
      ' MM      MM                                                    ',
      ' MM      MM ___   ___ ___  __    __      ___   ___  __         ',
      ' MM      MM MM    MM MM 6MMb  6MMb   6MMMMb  MM 6MMb        ',
      " MMMMMMMMMM  MM    MM  MM69 MM69 Mb 8M'  Mb  MMM9 Mb       ",
      " MM      MM  MM    MM  MM'   MM'   MM     ,oMM  MM'   MM       ",
      " MM      MM  MM    MM  MM    MM    MM ,6MM9'MM  MM    MM       ",
      " MM      MM  MM    MM  MM    MM    MM MM'   MM  MM    MM       ",
      ' MM      MM  YM.   MM  MM    MM    MM MM.  ,MM  MM    MM       ',
      "_MM_    _MM_  YMMM9MM__MM_  _MM_  _MM_YMMM9'Yb_MM_  _MM_/     ",
      '                                ____     ____  ___  __  /M     ',
      '                               6MMMMb.  6MMMMb MM 6MM /MMMMM  ',
      "                              6M'   Mb 6M'  Mb MM69 \"  MM     ",
      "                              MM    ' MM    MM MM'     MM     ",
      '                              MM       MMMMMMMM MM      MM     ',
      '                              MM       MM       MM      MM     ',
      '                              YM.   d9 YM    d9 MM      YM.  , ',
      '                               YMMMM9   YMMMM9 _MM_      YMMM9 '
    ]

    function calculateDimensions() {
      const container = document.getElementById('canvasContainer')
      const canvasElement = document.getElementById('myCanvas')

      if (container && canvasElement) {
        canvas = canvasElement
        ctx = canvas.getContext('2d')

        canvas.width = container.clientWidth
        canvas.height = container.clientHeight

        const textWidth = CUSTOM_TEXT[0].length
        const textHeight = CUSTOM_TEXT.length

        const availableWidth = canvas.width * (1 - 2 * MARGIN_PERCENTAGE / 100)
        const availableHeight = canvas.height * (1 - 2 * MARGIN_PERCENTAGE / 100)

        const fontSizeByWidth = availableWidth / textWidth
        const fontSizeByHeight = availableHeight / textHeight

        font_size = Math.floor(Math.min(fontSizeByWidth, fontSizeByHeight))

        if (window.innerWidth <= 768) {
          font_size = Math.max(font_size, 8)
        }

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
            let value = wave_map[y][x]
            let left = wave_map[y][x - 1] || value
            let right = wave_map[y][x + 1] || value
            let top = (wave_map[y - 1] || [])[x] || value
            let bottom = (wave_map[y + 1] || [])[x] || value
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

      let center_x = Math.floor(canvas_width / 2)
      let center_y = Math.floor(canvas_height / 2)
      let max_distance = Math.sqrt(Math.pow(canvas_width / 2, 2) + Math.pow(canvas_height / 2, 2))

      let text_y = Math.floor((canvas_height - CUSTOM_TEXT.length) / 2) - 1
      let text_x = Math.floor((canvas_width - CUSTOM_TEXT[0].length) / 2)

      for (let y = 0; y < canvas_height; ++y) {
        for (let x = 0; x < canvas_width; ++x) {
          let distance = Math.sqrt(Math.pow(x - center_x, 2) + Math.pow(y - center_y, 2))
          let normalized_distance = distance / max_distance

          let char, isTextChar = false, opacity = 1

          if (expansion_progress <= EXPANSION_FRAMES + TRANSITION_FRAMES) {
            let expansion_ratio = expansion_progress <= EXPANSION_FRAMES ? 
                easeInOutQuad(expansion_progress / EXPANSION_FRAMES) : 1
            let transition_progress = expansion_progress > EXPANSION_FRAMES ?
                (expansion_progress - EXPANSION_FRAMES) / TRANSITION_FRAMES : 0

            if (normalized_distance <= expansion_ratio) {
              let wave_char = CHAR[Math.floor(wave_map[y][x])]
              let random_char = CHAR[Math.floor(Math.random() * CHAR.length)]
              char = lerp_char(random_char, wave_char, transition_progress)
            } else {
              char = ' '
            }

            if (expansion_progress > EXPANSION_FRAMES - OPACITY_START_OFFSET &&
              y >= text_y && y < text_y + CUSTOM_TEXT.length &&
              x >= text_x && x < text_x + CUSTOM_TEXT[0].length &&
              CUSTOM_TEXT[y - text_y][x - text_x] !== ' ') {
              let wave_char = CHAR[Math.floor(wave_map[y][x])]
              let text_char = CUSTOM_TEXT[y - text_y][x - text_x]
              char = lerp_char(wave_char, text_char, transition_progress)
              isTextChar = true
              opacity = (expansion_progress - (EXPANSION_FRAMES - OPACITY_START_OFFSET)) / OPACITY_START_OFFSET
            }
          } else {
            if (y >= text_y && y < text_y + CUSTOM_TEXT.length &&
              x >= text_x && x < text_x + CUSTOM_TEXT[0].length &&
              CUSTOM_TEXT[y - text_y][x - text_x] !== ' ') {
              char = CUSTOM_TEXT[y - text_y][x - text_x]
              isTextChar = true
            } else {
              char = CHAR[Math.floor(wave_map[y][x])]
            }
            transition_completed = true
          }

          ctx.fillStyle = isTextChar ? `rgba(64, 64, 255, ${opacity})` : 'rgba(105, 105, 105, 0.2)'
          ctx.font = isTextChar ? `bold ${font_size}px monospace` : `${font_size}px monospace`
          
          ctx.fillText(char, x * char_width, (y + 1) * char_height)
          wave_map[y][x] = (wave_map[y][x] + 0.4) % CHAR.length
        }
      }

      expansion_progress++
      requestAnimationFrame(draw)
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    function lerp_char(a, b, t) {
      let index_a = CHAR.indexOf(a)
      let index_b = CHAR.indexOf(b)
      if (index_a === -1 || index_b === -1) return t < 0.5 ? a : b
      let lerped_index = Math.floor(index_a + (index_b - index_a) * t)
      return CHAR[lerped_index]
    }

    function map(value, in_min, in_max, out_min, out_max) {
      return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
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
    <div id="canvasContainer" className="relative flex items-center justify-center overflow-hidden border-2 border-[#222222] bg-[#222222] shadow-lg shadow-darkBlue-900/20 inset-4 sm:inset-6 lg:inset-12 rounded-3xl">
      <canvas id="myCanvas" className="w-full"></canvas>
    </div>
  )
}

export default AsciiAnimation
