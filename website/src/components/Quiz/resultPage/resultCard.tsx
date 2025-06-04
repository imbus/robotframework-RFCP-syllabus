import React from "react";
import Link from '@docusaurus/Link';
import { QuizPage } from '@site/src/components/Quiz/quizComponents';
import './sidebar.css'

const QuizResultCard: React.FC = (props: any) => {

    console.log(props);
    return (
        <div className="card">
            <div className="header">
                <p>{props.result.id}</p>
            </div>
            <div className="container">
                <p>Time: {props.result.timestamp} <br/>
                QuizId: {props.result.quizId} <br/>
                NumberOfQuestions: {props.result.results.numberOfQuestions} <br/>
                Solved: {props.result.results.solved} <br/>
                Right: {props.result.results.right} <br/>
                Wrong: {props.result.results.wrong}</p>
            </div>
        </div>
    );
};

export default QuizResultCard;