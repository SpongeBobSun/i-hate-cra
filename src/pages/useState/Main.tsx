import React, { PureComponent, useEffect, useState } from 'react'
import MemoCounter from './components/MemoCounter'
import MemoCounterUseCallback from './components/MemoCounterUseCallback'
import { StateCapture } from './components/StateCapture'
import { CounterUseMemo } from './components/MemoCounterUseMemo'

import './Main.css'

export function Main() {
    const [state, setState] = useState({
        count: 0
    })
    const onReset = () => {
        setState((s) => {
            console.log(s)
            return {
                count: 0
            }
        })
    }
    return (
        <div className='main-container' >
            <h3>Counter</h3>
            <p>Clicked <b>{state.count}</b> times</p>
            <button onClick={() => setState({ count: state.count + 1 })}>Click</button>
            <button onClick={onReset}>Reset</button>
            <hr />
            <h3>State Capture</h3>
            <StateCapture />
            <hr />
            <h3>Memo 1</h3>
            <MemoCounter />
            <hr />
            <h3>useCallback</h3>
            <MemoCounterUseCallback />
            <hr />
            <h3>useMemo</h3>
            <CounterUseMemo />
            <hr />
        </div>
    )
}
