import React, { memo, useState, useCallback } from 'react'

function memoCounter(props: { onClick, count }) {
    console.log('Child render')
    const { onClick, count } = props
    return (
        <button onClick={onClick}>ClickCount: {count}</button>
    )
}

const MemoCounter = memo(memoCounter)

export default function Counter() {
    console.log('Parent render')
    const [name, setName] = useState('')
    const [count, setCount] = useState(0)
    const onClick = useCallback(() => {
        setCount(count + 1)
    }, [count])
    // const onClick = useCallback(() => {
    //     debugger
    //     setCount(count + 1)
    // }, [])
    return (
        <div>
            <p>Input 值: {name}</p>
            <input onChange={e => setName(e.target.value)}/>
            <MemoCounter count={count} onClick={onClick} />
        </div>
    )
}
