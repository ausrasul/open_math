import axios from "axios"

const saveStats = (stats) => axios.post('/save_stats', {stats})

const api = {
    saveStats: saveStats
}
export default api
