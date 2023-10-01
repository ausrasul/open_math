const getAllStats = () => {
    return JSON.parse(localStorage.getItem("anneMatte"))
}
const saveAllStats = (stats) => {
    localStorage.setItem("anneMatte", JSON.stringify(stats))
}

const getStats = (gameName) => {
    const stats = getAllStats()
    if (stats[gameName]) return stats[gameName]
    return []
}

const setStats = (gameName, gameStats) => {
    let stats = getAllStats()
    if (!stats) stats = {}
    if (stats[gameName] === undefined) stats[gameName] = []
    stats[gameName].push(gameStats)
    saveAllStats(stats)
}

export default {
    save: setStats,
    get: getStats
}