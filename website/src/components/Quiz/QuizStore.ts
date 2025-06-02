import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the interfaces
interface QuizResult {
  id: number;
  quizId: string;
  timestamp: string;
  results: {
    numberOfQuestions: number;
    solved: number;
    right: number;
    wrong: number;
  }
}

interface Quiz {
  quiz: QuizResult[];
  addQuizResult: (quizId: string, numberOfQuestions: number, solved: number, right: number, wrong: number) => number;
}

const quizIdGenerator = incrementingIdGenerator();

// Create the store
const useQuizStore = create<Quiz>()(
  persist(
    (set, get) => ({
      quiz: [],

      // Action to add a new quiz
      addQuizResult: (quizId: string, numberOfQuestions: number, solved: number, right: number, wrong: number): number => {
        const state = get();

        const id : number = quizIdGenerator.next() as unknown as number;
        const timestamp =  new Date().toISOString();

        // Otherwise add the new quiz
        set({
          quiz: [
            ...state.quiz,
            {
              id,
              quizId,
              timestamp,
              results: {
                numberOfQuestions,
                solved,
                right,
                wrong,
              }
            }
          ]
        });

        return id;
      },

    }),
    {
      name: 'quiz-results', // unique name for localStorage
    }
  )
);

function* incrementingIdGenerator() {
    let index = 0;
    while (true) {
        yield
        index++;
    }
}

export default useQuizStore;