module.exports = class Stats {
  constructor(storage) {
    this.storage = storage;
  }
  validate = (s) => {
    if (typeof s !== "object") return false;
    const statObjKeys = [
      "avgTime",
      "points",
      "correctAnswers",
      "numOfQuestions",
      "rating",
      "ts",
    ];
    const missingParams = statObjKeys.reduce((acc, key) => {
      if (s[key] === undefined) return acc + 1;
      return acc;
    }, 0);
    const hasParams = Object.keys(s);
    if (missingParams === 0 && hasParams.length === statObjKeys.length)
      return true;
    return false;
  };
  save = (playerId, gameName, result) => {
    return new Promise((resolve, reject) => {
      if (!this.validate(result)) return resolve(false);
      this.storage
        .read(playerId)
        .then((gamesResults) => {
          if (gamesResults === null || typeof(gamesResults) === "string") gamesResults = {};
          if (!gamesResults[gameName]) gamesResults[gameName] = [];
          gamesResults[gameName].push(result);
          this.storage.write(playerId, gamesResults);
          resolve(true);
        })
        .catch(reject);
    });
  };
  get = (playerId) => this.storage.read(playerId);
};
