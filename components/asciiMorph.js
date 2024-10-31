export default function initRotatingAscii(container) {
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

  const textArt = [
    '                                                                                    ',
    '                                                                                    ',
    '  .g8"""bgd `7MM"""Mq. MMP""MM""YMM `7MMF\'                        `7MM              ',
    ".dP'     `M   MM   `MM.P'   MM   `7   MM                            MM              ",
    'dM\'       `   MM   ,M9      MM        MM         .gP"Ya   ,6"Yb.    MM  ,MP\',pP"Ybd ',
    'MM            MMmmdM9       MM        MM        ,M\'   Yb 8)   MM    MM ;Y   8I   `" ',
    'MM.    `7MMF\' MM            MM        MM      , 8M""""""  ,pm9MM    MM;Mm   `YMMMa. ',
    '`Mb.     MM   MM            MM        MM     ,M YM.    , 8M   MM    MM `Mb. L.   I8 ',
    "  `\"bmmmdPY .JMML.        .JMML.    .JMMmmmmMMM  `Mbmmd' `Moo9^Yo..JMML. YA.M9mmmP' ",
    '                                                                                    ',
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

  const totalHeight = Math.max(logoArt.length, textArt.length)
  const width = logoArt[0].length + textArt[0].length + 4

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

      if (x3 >= 0 && x3 < logoArt[0].length && y3 >= 0 && y3 < totalHeight) {
        if (z2 > zBuffer[y3][x3]) {
          zBuffer[y3][x3] = z2

          let finalChar
          if (point.isFace) {
            const angleFactor = Math.abs(Math.cos(angle))
            if (angleFactor > 0.2) {
              finalChar = point.char
            } else {
              const charIndex = Math.min(chars.length - 1, Math.floor((chars.length - 1) * 1))
              finalChar = chars[charIndex]
            }
          } else {
            const brightness = 1
            const charIndex = Math.min(
              chars.length - 1,
              Math.floor(brightness * (chars.length - 1))
            )
            finalChar = chars[charIndex]
          }

          output[y3][x3] = finalChar
        }
      }
    })

    const textStartY = Math.floor((totalHeight - textArt.length) / 2)
    for (let y = 0; y < textArt.length; y++) {
      for (let x = 0; x < textArt[0].length; x++) {
        output[y + textStartY][x + logoArt[0].length + 4] = textArt[y][x]
      }
    }

    container.innerHTML = output.map((row) => row.join('')).join('\n')
    animationFrameId = requestAnimationFrame(animate)
  }

  animate()

  // Cleanup function
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  }
}
