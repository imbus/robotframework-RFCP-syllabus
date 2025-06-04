import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';
import './quizResults.css';
import useIsBrowser from '@docusaurus/useIsBrowser';

import { quizPages } from '../components/Quiz/quizComponents';
import QuizResultSidebar from '@site/src/components/Quiz/resultPage/sidebar';
import QuizResultCard from '@site/src/components/Quiz/resultPage/resultCard'
import useQuizStore from '@site/src/components/Quiz/QuizStore'

export default function QuizResults(): JSX.Element {

  const isBrowser = useIsBrowser();

  const getQuizResults = useQuizStore((state) => state.getQuizResults);
  let results = [];

  const getCurrentQuizId = () => {
    console.log(window.location.hash.substring(1).toLowerCase());
    // Remove the leading # from the hash
    return window.location.hash.substring(1).toLowerCase();
  };

  if (isBrowser) {
    results = getQuizResults(getCurrentQuizId());
    console.log(results);
  }

  return (
    <Layout
      title="Quiz Results"
      description="View your quiz results">
      <div className="container">
        <div className="row">

          <QuizResultSidebar quizPages={quizPages} />

          <main className="col  quizResults">
            {results.map((result) => (
              <QuizResultCard key={result.id} result={result} />
            ))}
          </main>
        </div>
      </div>
    </Layout>
  );
}

