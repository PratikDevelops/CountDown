import React from "react";
import { forwardRef } from "react";
import { useImperativeHandle,useRef } from "react";
import {createPortal} from "react-dom"

const ResultModal = forwardRef(function ResultModal(
  {  targetTime,remainingTime,onReset },
  ref
) { 
    const dialog =  useRef()
    const userLost = remainingTime <=0
    const formattedTime = (remainingTime/1000).toFixed(2)
    const score = Math.round(( 1 - remainingTime/(targetTime*1000))*100)
    useImperativeHandle(ref,()=>{
        return {
            open(){
                 dialog.current.showModal()
            }
        }
    })
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset} >
      {userLost && <h1>You Lost</h1>}
      {!userLost && <h1>Your Score : {score}</h1>}
      <p>
        The Target Time was <strong>{targetTime}</strong>
      </p>
      <p>
        You Stopped the timer with <strong>{formattedTime}</strong> seconds left
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
