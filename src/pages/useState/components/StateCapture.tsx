import React, { useState } from 'react'

export function StateCapture() {
    const [number, setNumber] = useState(0)
    function alertNumber() {
        setTimeout(() => {
            // 捕获到的是当次渲染时的 state, 不受后续 state 影响
            alert(number)
        }, 3000)
    }

    let globalNumber = 0
    function alertGlobal() {
        setTimeout(() => {
            alert(globalNumber)
        },3000)
    }
    return (
        <>
            <p>State count: {number}</p>
            <p>Global count: {globalNumber}</p>
            <button onClick={() => setNumber(number + 1)}>Add state count</button>
            <button onClick={() => globalNumber += 1}>Add global count</button>
            <button onClick={alertNumber}>Alert number in state</button>
            <button onClick={alertGlobal}>Alert global number</button>
        </>
    )
}