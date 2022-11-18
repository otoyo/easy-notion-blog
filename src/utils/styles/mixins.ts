const mixins = {
  transitionOpacity: `
    transition: opacity 0.7s ease-in-out;
  `,
  transitionPositionRight: `
    transition: right 0.3s ease;
  `,
  transitionWidth: `
    transition: width 0.3s  ease-in-out;
  `,
  transitionColor: `
    transition: color 0.7s ease-in-out;
  `,
  transitionLeft: `
    transition: left 0.4s ease-in-out;
  `,
  fontSize: (size, line = 24): string => {
    const rem = size / 10
    const lineSize = line / size

    return `
      font-size: ${size}px;
      font-size: ${rem}rem;
      line-height: ${lineSize};
    `
  },
}
export default mixins
