export function getTechClassName(tech?: string): string {
  switch (tech) {
    case 'JavaScript/TypeScript':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'React':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'Python':
      return 'bg-yellow-100 text-orange-800 border-yellow-200'
    case 'Dart':
      return 'bg-sky-100 text-sky-800 border-sky-200'
    case 'Pytorch':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Pandas' :
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Numpy' :
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}
