import { calculate_points } from "../../Lib/results";
import storage from "../../Lib/storage";

export default class Presenter {
  constructor(params) {
    this.numOfQuestions = params.numOfQuestions
    this.maxTime = params.maxTime
    this.maxPoints = params.maxPoints
  }
  loadParams = () => {
    return new Promise((resolve) => {
      resolve({
        numOfQuestions: this.numOfQuestions,
        maxTime: this.maxTime,
        maxPoints: this.maxPoints,
      });
    });
  };
  generateAndSaveStats = (answers) => {
    return new Promise(resolve => {
        let totalTimeSpent = 0
        let correctAnswers = 0
        let points = 0
        answers.forEach(answer => {
            totalTimeSpent += answer.time
            if(answer.correct){
                correctAnswers += 1
                points += calculate_points(answer.time, this.maxTime, this.maxPoints);
            }
        })
        const stats = {
            avgTime: Math.floor(totalTimeSpent/this.numOfQuestions),
          points,
          correctAnswers,
          numOfQuestions: this.numOfQuestions,
          rating: points/this.numOfQuestions / this.maxPoints,
          ts: new Date().getTime()
        }
        storage.save(stats)
        resolve(stats)
    })
  }
}
