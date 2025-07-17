import React, { Suspense } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const QuizComponent = React.lazy(() => import('./QuizComponent'));

export default function QuizLoader(props) {
  if (!ExecutionEnvironment.canUseDOM) return null;
  return (
    <Suspense fallback={<div>Loading QuizComponent...</div>}>
      <QuizComponent {...props} />
    </Suspense>
  );
}