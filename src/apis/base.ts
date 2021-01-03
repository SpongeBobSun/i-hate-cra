import { from, Observable } from 'rxjs'

// const BASE_URL = 'http://localhost:2390'
const BASE_URL = 'https://randomuser.me/api/'

const getHeader = () => {
    return {
        'Content-Type': 'application/json; charset=utf-8'
    }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH'

interface RequestParam {
    method: Method,
    headers: Headers,
    mode: 'cors' | 'same-origin',
    body?: string
}

export async function request<T>(url: string, header?: any, body?: any, method: Method = 'GET', cors = true): Promise<T> {
    const mergedHeaders = Object.assign(getHeader(), header)
    const params: RequestParam = {
        method: method,
        headers: new Headers(mergedHeaders),
        mode: cors ? 'cors' : 'same-origin'
    }
    if (body !== undefined) {
        params.body = JSON.stringify(body)
    }
    return new Promise((resolve, reject) => {
        fetch(BASE_URL + url, {
            ...params
        }).then(resp => {
            return resp.text()
        }).then(text => {
            if (text == null || text.length === 0) {
                resolve(null)
            } else {
                resolve(JSON.parse(text))
            }
        }).catch(err => {
            reject(err)
        })
    })
}


export function rxRequest<T>(url: string, header?: any, body?: any, method: Method = 'GET', cors = true): Observable<T> {
    return from(request<T>(url, header, body, method, cors))
}
