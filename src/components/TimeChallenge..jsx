import React, { useState, useRef } from 'react'
import ResultModal from './ResultModal'

export default function TimeChallenge({ title, targetTime }) {
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
    const [timerIsActive, setTimerIsActive] = useState(false);
    const timer = useRef(null);
    const dialog = useRef(null);

    // Check if time has run out and handle end of challenge
    if (timeRemaining <= 0 && timer.current) {
        clearInterval(timer.current);
        timer.current = null;
        setTimerIsActive(false);
        dialog.current.open();
    }

    // Function to reset the timer and modal state
    function handleReset() {
        setTimeRemaining(targetTime * 1000);
        setTimerIsActive(false); // Reset the timer status
    }

    // Start the timer
    function handleStart() {
        if (!timerIsActive) {
            setTimerIsActive(true);
            timer.current = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 10);
            }, 10);
        }
    }

    // Stop the timer
    function handleStop() {
        if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
        }
        setTimerIsActive(false);
        dialog.current.open(); // Show modal when stopped manually
    }

    return (
        <>
            <ResultModal
                ref={dialog}
                targetTime={targetTime}
                remainingTime={timeRemaining}
                onReset={handleReset}
            />
            <section className='challenge'>
                <h2>{title}</h2>

                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>

                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>

                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running" : "Timer inactive"}
                </p>

                <p>Remaining Time: {(timeRemaining / 1000).toFixed(2)} seconds</p>
            </section>
        </>
    );
}
