export const getCurrentUserID = () => {
  return localStorage.getItem('userId') || ''
}
