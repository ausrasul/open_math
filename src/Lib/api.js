import axios from "axios"

const saveStats = (gameName, gameResult) => axios.post('/save_stats', {gameName, gameResult})
const getAllStats = () => {
    return new Promise((resolve, reject) => {
        axios.post('/get_all_stats', {}).then(res => {
            resolve(res.data)
        })
        .catch(reject)
    })
}

const api = {
    saveStats: saveStats,
    getAllStats: getAllStats
}
export default api
