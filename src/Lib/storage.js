import api from "../Lib/api"

const getAllStats = () => {
    let stats = JSON.parse(localStorage.getItem("anneMatte"))
    if (!stats) return {}
    return stats
}
const saveAllStats = (stats) => {
    localStorage.setItem("anneMatte", JSON.stringify(stats))
    api.saveStats(stats)
}

const getStats = (gameName) => {
    const stats = getAllStats()
    if (stats[gameName]) return stats[gameName]
    return []
}

const setStats = (gameName, gameStats) => {
    let stats = getAllStats()
    if (stats[gameName] === undefined) stats[gameName] = []
    stats[gameName].push(gameStats)
    saveAllStats(stats)
}
const storage = {
    save: setStats,
    get: getStats,
    getAll: getAllStats
}
export default storage