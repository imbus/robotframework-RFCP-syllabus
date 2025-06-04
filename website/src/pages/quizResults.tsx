import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import styles from './quizResults.module.css';
import useIsBrowser from '@docusaurus/useIsBrowser';

import { quizPages } from '../components/Quiz/quizComponents';
import QuizResultSidebar from '@site/src/components/Quiz/resultPage/sidebar';

export default function QuizResults(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const isBrowser = useIsBrowser();

  // Get quiz results from localStorage (client-side only)
  const [quizResults, setQuizResults] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (isBrowser) {
      try {
        const storedResults = localStorage.getItem('quiz-results');
        console.log(quizPages);
        if (storedResults) {
          setQuizResults(JSON.parse(storedResults));
        }
      } catch (error) {
        console.error('Error loading quiz results from localStorage:', error);
      }
    }
  }, [isBrowser]);

  return (
    <Layout
      title="Quiz Results"
      description="View your quiz results">
      <div className="container">
        <div className="row">
          
          <QuizResultSidebar quizPages={quizPages}/>

          <main className="col col--9">
            <div className={styles.quizResultsContainer}>
              <article>
                <h1>Quiz Results</h1>
                {quizResults.length > 0 ? (
                  <>
                    <p>Here are your saved quiz results:</p>
                    <div className={styles.resultsContainer}>
                      {quizResults.map((result, index) => (
                        <div key={index} className={styles.resultCard}>
                          <h3>{result.quizName || `Quiz ${index + 1}`}</h3>
                          <div className={styles.resultDetails}>
                            <p><strong>Score:</strong> {result.score}/{result.total} ({Math.round((result.score / result.total) * 100)}%)</p>
                            <p><strong>Date:</strong> {new Date(result.timestamp).toLocaleString()}</p>
                          </div>
                          <div className={styles.resultStats}>
                            <div className={styles.stat}>
                              <span className={styles.statLabel}>Correct</span>
                              <span className={styles.statValue}>{result.score}</span>
                            </div>
                            <div className={styles.stat}>
                              <span className={styles.statLabel}>Incorrect</span>
                              <span className={styles.statValue}>{result.total - result.score}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>No quiz results found. Complete a quiz to see your results here.</p>
                )}
              </article>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

