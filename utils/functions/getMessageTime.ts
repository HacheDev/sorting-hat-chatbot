export const getMessageTime = (): string => {
    const currentDate = new Date()
    return currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? "0" : "") + currentDate.getMinutes()
}