export function getColorProficiency(proficiency: number): string {
  switch (proficiency) {
    case 100:
      return 'rgb(198, 48, 49)'
    case 80:
      return 'rgb(255, 184, 0)'
    case 60:
      return 'rgb(46, 125, 50)'
    case 40:
      return 'rgb(2, 136, 209)'
    default:
      return 'rgb(118, 118, 118)'
  }
}
