export function getColorProficiency(proficiency: number): string {
  let color: string
  switch (proficiency) {
    case 100:
      color = 'rgb(198, 48, 49)'
      break
    case 80:
      color = 'rgb(255, 184, 0)'
      break
    case 60:
      color = 'rgb(46, 125, 50)'
      break
    case 40:
      color = 'rgb(2, 136, 209)'
      break
    default:
      color = 'rgb(118, 118, 118)'
      break
  }
  return color
}
