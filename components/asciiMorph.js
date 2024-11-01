export default function initRotatingAscii(container, theme) {
  if (!container) return

  const logoArt = [
    '                                                              ',
    '                                                              ',
    '                                                              ',
    '                            ..                                ',
    '                      .*@@@@@@@@@#-.                          ',
    '                    -@@@@%+---=#@@@@+.                        ',
    '                  .#@@@-..      .:#@@@%@@@@%*-.               ',
    '                 .#@@*.         .=%@@@@@%@@@@@@%:             ',
    '              .-+#@@*.       .+%@@@@+..    ..+@@@%..          ',
    '          ..*@@@@@@@=     .+@@@@%+..          .+@@@:          ',
    '         .*@@@#-.*@@=   .@@@@%=.     ..         =@@#          ',
    '        :@@@+..  *@@=   .@@-.     .-#@@@*:.      %@@.         ',
    '       .@@@:.    *@@=   .@%.  ..=@@@#-#@@@@#-.  .*@@-         ',
    '       +@@*      *@@=   :@%..+@@@#.     .*@@@@%-.@@@.         ',
    '       *@@=      *@@=   :@@@@@++@@@#:.     .*@@@@@@+          ',
    '       *@@+      *@@=   -@@=     .=@@@#..     .=@@@@:.        ',
    '       :@@@.    .+@@%.  -@%.       .#@+@@@%.      :@@@-        ',
    '       .-@@@:    ..:#@@%+@%        #@=..:#@@+     .@@@:       ',
    '        .:@@@@=.  ....:#@@@=      -@@-...-@@#      +@@*       ',
    '          +@@@@@@+..     :#@@@+=@@@@@-   -@@#      -@@#.      ',
    '         .@@@.-%@@@@*..   ..#@@@*:.%@:   -@@#      +@@+       ',
    '         :@@#   .-#@@@@#:*@@@=..  .%@:   -@@#     :@@@.       ',
    '         .@@%.     .:#@@@%=.      -@@:   -@@#   .+@@@:        ',
    '          #@@=.       ....   ..-%@@@@.   -@@#.-#@@@#..        ',
    '          :@@@=.           .=%@@@@+.     -@@@@@@@*..          ',
    '           .#@@@+..    ..+@@@@%+..       *@@#+-..             ',
    '            .:%@@@@@%%@@@@@%=..        .*@@#.                 ',
    '               .-*%@@@@%@@@*.         -@@@%.                  ',
    '                         *@@@@#=---+%@@@@=.                   ',
    '                          .-%@@@@@@@@@#:                      ',
    '                               ......                         ',
    '                                                              ',
    '                                                              ',
    '                                                              ',
  ]

  const DEPTH = 15
  const chars = '@%#*+=-:. '.split('')
  let angle = 0

  function findCenter() {
    let minX = logoArt[0].length,
      maxX = 0
    let minY = logoArt.length,
      maxY = 0

    for (let y = 0; y < logoArt.length; y++) {
      for (let x = 0; x < logoArt[0].length; x++) {
        if (logoArt[y][x] !== ' ') {
          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
          minY = Math.min(minY, y)
          maxY = Math.max(maxY, y)
        }
      }
    }

    return {
      x: Math.floor((minX + maxX) / 2),
      y: Math.floor((minY + maxY) / 2),
      screenX: Math.floor(logoArt[0].length / 2),
      screenY: Math.floor(logoArt.length / 2),
    }
  }

  const center = findCenter()

  function create3DPoints() {
    const points = []
    let minX = logoArt[0].length,
      maxX = 0
    let minY = logoArt.length,
      maxY = 0

    for (let y = 0; y < logoArt.length; y++) {
      for (let x = 0; x < logoArt[0].length; x++) {
        if (logoArt[y][x] !== ' ') {
          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
          minY = Math.min(minY, y)
          maxY = Math.max(maxY, y)
        }
      }
    }

    for (let y = 0; y < logoArt.length; y++) {
      for (let x = 0; x < logoArt[0].length; x++) {
        if (logoArt[y][x] !== ' ') {
          points.push({
            x: x - center.x,
            y: y - center.y,
            z: 0,
            char: logoArt[y][x],
            isFace: true,
          })

          points.push({
            x: x - center.x,
            y: y - center.y,
            z: -DEPTH,
            char: logoArt[y][x],
            isFace: true,
          })

          if (
            x === minX ||
            x === maxX ||
            y === minY ||
            y === maxY ||
            logoArt[y][x - 1] === ' ' ||
            logoArt[y][x + 1] === ' ' ||
            logoArt[y - 1]?.[x] === ' ' ||
            logoArt[y + 1]?.[x] === ' '
          ) {
            for (let z = 1; z < DEPTH; z++) {
              points.push({
                x: x - center.x,
                y: y - center.y,
                z: -z,
                char: logoArt[y][x],
                isSide: true,
              })
            }
          }
        }
      }
    }
    return points
  }

  const points = create3DPoints()
  const width = logoArt[0].length
  const totalHeight = logoArt.length

  let animationFrameId

  function animate() {
    angle += 0.02

    const output = Array(totalHeight)
      .fill()
      .map(() => Array(width).fill(' '))
    const zBuffer = Array(totalHeight)
      .fill()
      .map(() => Array(width).fill(-Infinity))

    points.forEach((point) => {
      const x2 = point.x * Math.cos(angle) + point.z * Math.sin(angle)
      const z2 = -point.x * Math.sin(angle) + point.z * Math.cos(angle)

      const x3 = Math.round(center.screenX + x2)
      const y3 = Math.round(center.screenY + point.y)

      if (x3 >= 0 && x3 < width && y3 >= 0 && y3 < totalHeight) {
        if (z2 > zBuffer[y3][x3]) {
          zBuffer[y3][x3] = z2

          let finalChar
          if (point.isFace) {
            const angleFactor = Math.abs(Math.cos(angle))
            if (angleFactor > 0.2) {
              finalChar = point.char
            } else {
              const charIndex = Math.min(chars.length - 1, Math.floor((chars.length - 1) * 0.7))
              finalChar = chars[charIndex]
            }
          } else {
            const brightness = 0.7
            const charIndex = Math.min(chars.length - 1, Math.floor(brightness * (chars.length - 1)))
            finalChar = chars[charIndex]
          }

          output[y3][x3] = finalChar
        }
      }
    })

    container.innerHTML = output.map((row) => row.join('')).join('\n')
    animationFrameId = requestAnimationFrame(animate)
  }

  function resizeToContainer() {
    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const isMobile = window.innerWidth < 768
    const scaleFactor = isMobile ? 0.8 : 0.95
    const fontSize = Math.min(containerWidth / width, containerHeight / totalHeight) * scaleFactor

    container.style.fontSize = `${fontSize}px`
    container.style.lineHeight = isMobile ? '1.2' : '1'
    container.style.padding = isMobile ? '5px' : '10px'
  }

  window.addEventListener('resize', resizeToContainer)
  resizeToContainer()
  animate()

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    window.removeEventListener('resize', resizeToContainer)
  }
}
