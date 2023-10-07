import api from "../Lib/api";

const getAllStats = () => {
  return new Promise((resolve) => {
    api.getAllStats().then((data) => resolve(data.stats));
  });
};
const tmpGetAllStats = () => {
  return JSON.parse(localStorage.getItem("anneMatte"));
};

const setStats = (gameName, gameStats) => {
  api.saveStats(gameName, gameStats);
  let stats = tmpGetAllStats();
  if (stats) {
    Object.keys(stats).forEach((gameName_) => {
      stats[gameName_].forEach((gameStats_) => {
        api.saveStats(gameName_, gameStats_);
      });
    });
    localStorage.removeItem("anneMatte");
  }
};
const storage = {
  save: setStats,
  getAll: getAllStats,
};
export default storage;
