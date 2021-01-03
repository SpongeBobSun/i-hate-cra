import { BehaviorSubject } from 'rxjs'
import { useState, useEffect } from 'react'
import { catchError } from 'rxjs/operators'

export function useSharedState<T>(subject: BehaviorSubject<T>): [T, (s: T) => void] {
    const [state, setState] = useState(subject.getValue())
    useEffect(() => {
        subject.subscribe(s => setState(s))
        return () => subject.unsubscribe()
    }, [])
    const setRxState = (s: T) => { subject.next(s) }
    return [state, setRxState]
}

export function setPartial<T>(subject: BehaviorSubject<T>, partial: Partial<T>) {
    const currentValue = subject.getValue()
    subject.next({
        ...currentValue,
        ...partial
    })
}
