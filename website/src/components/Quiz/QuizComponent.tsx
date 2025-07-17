import React, { useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

import catppuccinLatte from './shiki/catppuccin-latte.mjs';
import catppuccinMocha from './shiki/catppuccin-mocha.mjs';
import python from  './shiki/python.mjs';
import Quizdown from 'quizdown-extended/dist/quizdown.es.js';

import useQuizStore from './QuizStore';
import './Quiz.css';

export default function Quiz(props) {
  const quiz = useQuizStore((state) => state.quiz);
  const addQuizResult = useQuizStore((state) => state.addQuizResult);
  const resultBaseUrl = useBaseUrl('/quizResults');

  const generateQuizId = (name) => {
    let page = typeof window !== 'undefined' ? window.location.pathname : '';
    page = page.replace("/robotframework-RFCP-syllabus/", "");
    let id = page.replace("docs/", "") + "#" + name.replace(" ", "+");
    id = id.toLocaleLowerCase();
    return id;
  };

  const generateResultLink = () => {
    if (ExecutionEnvironment.canUseDOM) {
      return resultBaseUrl + "#" + generateQuizId(props.name);
    }
    return "#";
  };

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    // Set color scheme for quizdown
    document.documentElement.style.setProperty('--quizdownPrimaryColor', "var(--ifm-color-primary)");

    // Initialize Quizdown
    let node = document.querySelector('#quizDownContainer');
    let quizdown = new Quizdown();

    const config = {
      startOnLoad: true,
      shuffleAnswers: true,
      shuffleQuestions: true,
      nQuestions: undefined,
      primaryColor: 'var(--quizdownPrimaryColor)',
      secondaryColor: 'var(--quizdownSecondaryColor)',
      textColor: 'var(--quizdownTextColor)',
      buttonColor: 'var(--quizdownSecondaryColor)',
      locale: null,
      enableRetry: true
    };

    quizdown.createApp(props.question, node, config);

    quizdown.hooks.onQuizFinish((event) => {
      addQuizResult(generateQuizId(props.name), event.numberOfQuestions, event.solved, event.right, event.wrong);
    });

    quizdown.getShikiInstance()
      .then(async (instance) => {
        console.log(python);
        await quizdown.registerShikiLanguage(python);
        await quizdown.registerShikiTheme("catppuccin-latte", "light", catppuccinLatte);
        await quizdown.registerShikiTheme("catppuccin-mocha", "dark", catppuccinMocha);
      });

    // Clean-up: optionally remove quizdown instance if needed
    // return () => { ... };

    // Only rerun if question changes
  }, [props.question]);

  return (
    <span id="quizContainer">
      <span id="quizDownContainer" className='quizdown'>
      </span>
      <a id="resultLink" href={generateResultLink()} >View results</a>
    </span>
  );
}