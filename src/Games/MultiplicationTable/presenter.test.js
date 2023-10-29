import { vi } from "vitest";
import Presenter from "./presenter";
import storage from "../../Lib/storage";

vi.mock("../../Lib/storage", () => {
  return { default: { save: vi.fn() } };
});

// mock storage

describe("mulitplicationTable", () => {
  const params = [
    {
      numOfQuestions: 3,
      maxTime: 10000,
      maxPoints: 10,
    },
    {
      numOfQuestions: 3,
      maxTime: 50000,
      maxPoints: 100,
    },
    {
      numOfQuestions: 4,
      maxTime: 20000,
      maxPoints: 5,
    },
  ];

  test("loads game params", async () => {
    params.forEach(async (params_) => {
      const p = new Presenter(params_);
      await expect(p.loadParams()).resolves.toEqual(params_);
    });
  });
  test("generate and save stats", async () => {
    const testCases = [
      {
        params: params[0],
        answers: [
          { correct: false, time: 2000 },
          { correct: false, time: 2000 },
          { correct: false, time: 2000 },
        ],
        stats: {
          avgTime: 2000,
          points: 0,
          correctAnswers: 0,
          numOfQuestions: 3,
          rating: 0,
        },
      },
      {
        params: params[1],
        answers: [
          { correct: true, time: 10000 },
          { correct: true, time: 20000 },
          { correct: true, time: 30000 },
        ],
        stats: {
          avgTime: 20000,
          points: 80 + 60 + 40,
          correctAnswers: 3,
          numOfQuestions: 3,
          rating: 180 / 3 / 100,
        },
      },
      {
        params: params[2],
        answers: [
          { correct: true, time: 10000 },
          { correct: true, time: 20000 },
          { correct: false, time: 30000 },
          { correct: false, time: 40000 },
        ],
        stats: {
          avgTime: 25000,
          points: 3,
          correctAnswers: 2,
          numOfQuestions: 4,
          rating: 3 / 4 / 5,
        },
      },
    ];
    for (const t of testCases) {
      vi.resetAllMocks();
      const p = new Presenter(t.params);
      const stats = await p.generateAndSaveStats(t.answers);
      expect(stats).toMatchObject(t.stats);
      expect(storage.save).toHaveBeenCalledTimes(1);
      expect(storage.save).toHaveBeenCalledWith(
        'Multiplikation',
        expect.objectContaining(t.stats)
      );
    }
  });
});
