import { Observable } from 'rxjs'
import { rxRequest } from './base'

export type UserList = {
    results: User[]
}

export type User = {
    gender: string
    name: {
        title: string
        first: string
        last: string
    }
    location: {
        street: {
            name: string
            number: number
        }
        country: string
        city: string
        state: string
        postcode: string
    }
    email: string
    dob: {
        date: string
        age: number
    }
    phone: string
    cell: string
    picture: {
        large: string
        medium: string
        thumbnail: string
    }
}

export function requestUserList(page: number): Observable<UserList> {
    return rxRequest(`?page=${page}&results=10`)
}
