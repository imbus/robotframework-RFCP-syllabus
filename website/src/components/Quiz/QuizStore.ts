import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the interfaces
interface QuizItem {
  id: string;
  page: string;
  name: string;
}

interface QuizState {
  quiz: QuizItem[];
  addQuiz: (page: string, name: string) => string;
}

// Create the store
const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      quiz: [],
      
      // Action to add a new quiz
      addQuiz: (page: string, name: string): string => {
        const state = get();
        console.log("add");
        
        // Create a stable ID from page and name
        const id = `${page.toLowerCase().replace(/\s+/g, '-')}#${name.toLowerCase().replace(/\s+/g, '-')}`;
        
        // Check if a quiz with this ID already exists
        const existingQuiz = state.quiz.find(q => q.id === id);
        
        // If the quiz already exists, just return its ID
        if (existingQuiz) {
          return existingQuiz.id;
        }
        
        // Otherwise add the new quiz
        set({
          quiz: [
            ...state.quiz,
            {
              id,
              page,
              name
            }
          ]
        });
        
        return id;
      }
    }),
    {
      name: 'quiz-storage', // unique name for localStorage
    }
  )
);

export default useQuizStore;