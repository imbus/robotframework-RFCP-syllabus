import React from "react";
import Link from '@docusaurus/Link';
import { QuizPage } from '@site/src/components/Quiz/quizComponents';
import './sidebar.css'

const QuizResultSidebar: React.FC = (props: any) => {
    const isItemActive = (id: string) => {
        // Remove the leading # from the hash
        const currentPageId = window.location.hash.substring(1);

        return id === currentPageId;
    };

    const capitalizeFirstLetter = (str: string) => {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    return (
        <div className="col col--3">
            {/* Sidebar Navigation */}
            <div className="sidebar">
                <nav className="menu thin-scrollbar">
                    <ul className="menu__list">
                        {props.quizPages.map((quizPage) => (
                            <li key={quizPage.id}>
                                <span className="page">
                                    {capitalizeFirstLetter(quizPage.name)}
                                </span>
                                <ul className="menu__list">
                                    {quizPage.quizzes.map((quizComponent) => (
                                        <li key={quizComponent.id}>
                                            <Link to={"#" + quizComponent.id} className={isItemActive(quizComponent.id) ? "menu__link menu__link--active" : "menu__link"}>
                                                {capitalizeFirstLetter(quizComponent.name)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default QuizResultSidebar;