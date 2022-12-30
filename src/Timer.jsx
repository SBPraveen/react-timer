import React, { useEffect, useRef, useState } from "react";

function Timer({ start }) {

    const [timer, setTimer] = useState(0)
    const rendersCounter = useRef(0)

    let timerId

    /*
    || So what happens if setInterval is used outside of the UseEffect
        If setInterval is used outside of the useEffect, after 1 second the callback in the setInterval is executed we increment the state because of which the component gets rendered and thus a new setInterval will be created.
        This will result in multiple setInterval being created and will cause major performance issues.
        If setInterval is used inside the useEffect with empty dependency array the callback in the useEffect will be executed only once and thus only one setInterval will be created.
    || Why is a  callback passed inside the useState?
        setTimer(timer => timer + 1). When setInterval inside the useEffect is encountered it will be shifted to the async code execution space. Since the "timer" value is used inside setInterval's callback, it will also be taken into the async code execution space. But when the timer value gets updated the timer inside the  async code execution space will still be 0 because of which eventhough in setTimer we do timer + 1 it will still be 0+1 => 1. Timer will not increment beyond 1. This is solved by using a callback which ensures that the latest timer value is used.

    ||Why to return a callback in the useEffect??
        Returning a callback in the useEffect ensures that once the component is unmounted the setInterval is cleared(This ensures that the setInterval is not executing when the timer is not displayed). This is used as a clean up mechanism.

    ||Why timer component renders twice for every second?
        The timer component renders twice for every second because react is in strict mode.
        Go to index.js and comment strict mode tag. You will find a single render.
        This happens is an intentional feature of the React.StrictMode. It only happens in development mode and should help to find accidental side effects in the render phase.
        https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice 

    */

    useEffect(()=>{
        if(!start && timerId){
            clearInterval(timerId)
        }
        else if(start === "reset"){
            setTimer(0)
            clearInterval(timerId)
        }
        else if(start){
            timerId = setInterval(()=>{
                setTimer(timer => timer + 1)
            }, 1000)
        }
        return ()=>{
            if(timerId){
                console.log("Clean up");
                clearInterval(timerId)
            }
        }
    }, [start])

    rendersCounter.current++

    return (
        <div>
            <h1>{timer}</h1>
            <p>No of times "Timer" component rendered : {rendersCounter.current}</p>
            <p>Note: Timer component renders twice for every second change beacuse of strict mode in react</p>
        </div>
    )
}

export default Timer
