import React, { useState } from 'react';

export default function WYR() {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false); // State to control showing results
    const [votes, setVotes] = useState({}); // Stores votes for the current question's answers

    const fetchRandomQuestion = async () => {
        setLoading(true);
        setError(null);
        setQuestion(null); // Clear previous question
        setShowResults(false); // Hide results for new question
        setVotes({}); // Clear previous votes

        try {
            const response = await fetch('http://localhost:8080/game/random');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setQuestion(data);

            // Initialize votes state with actual votes from the fetched question
            const initialVotes = {};
            data.answers.forEach(answer => {
                initialVotes[answer.id] = answer.votes; // Use actual votes from backend
            });
            setVotes(initialVotes);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerClick = async (chosenAnswerId) => {
        if (showResults) return; // Prevent voting again if results are already shown

        setLoading(true); // Show loading state while voting
        setError(null);

        try {
            const response = await fetch(`http://localhost:8080/game/vote/${chosenAnswerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedQuestion = await response.json();
            setQuestion(updatedQuestion); // Update the question with new vote counts

            // Update the votes state based on the updated question from the backend
            const updatedVotes = {};
            updatedQuestion.answers.forEach(answer => {
                updatedVotes[answer.id] = answer.votes;
            });
            setVotes(updatedVotes);
            setShowResults(true); // Show results after successful vote

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-20">
            <p className="text-2xl font-bold">Would you rather</p>
            <hr className="my-4 border-gray-300" />
            <br/>
            <div className="flex flex-row justify-between w-1/4">
                <button
                    className="border-1-gray-300 border rounded-lg p-1"
                    onClick={fetchRandomQuestion}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get Random Question'}
                </button>
                <button className="border-1-gray-300 border rounded-lg p-1">create Question</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {question && (
                <div className="mt-4 border rounded-lg shadow-md w-1/2 ">
                    <p className="text-lg font-semibold pt-5 pl-5">Nr. {question.id}</p>
                    <div className="flex flex-col items-center">
                        <p className="text-xl my-2 pb-2">{question.text}</p>
                        {!showResults ? (
                            // Render answer buttons if results are not shown
                            <div className="flex flex-row w-full h-40 justify-between">
                                {question.answers.map((answer, index) => (
                                    <button
                                        key={answer.id}
                                        className={`w-1/2 ${index === 0 ? 'bg-blue-500 hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700'}`}
                                        onClick={() => handleAnswerClick(answer.id)}
                                        disabled={loading} // Disable buttons while loading/voting
                                    >
                                        {answer.text}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            // Render results if an answer has been chosen or if results are explicitly shown
                            <div className="flex flex-col w-full p-4">
                                {question.answers.map(answer => {
                                    const totalVotes = question.answers.reduce((sum, ans) => sum + ans.votes, 0); // Use votes from question object
                                    const answerVotes = answer.votes; // Use votes from answer object
                                    const percentage = totalVotes === 0 ? 0 : ((answerVotes / totalVotes) * 100).toFixed(1);

                                    return (
                                        <div key={answer.id} className="mb-4">
                                            <p className="text-lg font-semibold">
                                                {answer.text}: {answerVotes} votes ({percentage}%)
                                            </p>
                                            <div className="w-full bg-gray-200 rounded-full h-4">
                                                <div
                                                    className={`h-4 rounded-full ${answer.id === question.answers[0].id ? 'bg-blue-500' : 'bg-red-500'}`}
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}