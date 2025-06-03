import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the interfaces
interface QuizResult {
  id: string;
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
  addQuizResult: (quizId: string, numberOfQuestions: number, solved: number, right: number, wrong: number) => string;
}


// Create the store
const useQuizStore = create<Quiz>()(
  persist(
    (set, get) => ({
      quiz: [],

      // Action to add a new quiz
      addQuizResult: (quizId: string, numberOfQuestions: number, solved: number, right: number, wrong: number): string => {
        const state = get();

        const id : string = self.crypto.randomUUID();;

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


export default useQuizStore;