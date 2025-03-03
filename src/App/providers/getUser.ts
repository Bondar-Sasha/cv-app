export const getUser = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(localStorage.getItem('user'))
}