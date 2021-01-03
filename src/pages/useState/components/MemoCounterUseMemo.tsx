import React, { memo, useState, useCallback, useMemo } from 'react'

function memoCounter(props: { onClick, data: { count: number } }) {
    console.log('Child render')
    const { onClick, data } = props
    return (
        <button onClick={onClick}>ClickCount: {data.count}</button>
    )
}

const MemoCounter = memo(memoCounter)

let oldState, oldOnClick

export function CounterUseMemo() {
    console.log('Parent render')
    const [name, setName] = useState('')
    const [count, setCount] = useState(0)

    const computedCount = useMemo(() => ({ count }), [count])
    console.log(`Memoed Equal? ${computedCount === oldState}`)
    oldState = computedCount

    const onClick = useCallback(() => setCount(count + 1), [count])
    console.log(`OnClick Equal? ${onClick === oldOnClick} `)
    oldOnClick = onClick

    return (
        <div>
            <p>Input 值: {name}</p>
            <input onChange={e => setName(e.target.value)}/>
            <MemoCounter data={computedCount} onClick={onClick} />
        </div>
    )
}
