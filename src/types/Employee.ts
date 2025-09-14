export interface Employee {
    id: string
    name: string
    ssn: string
    address1: string
    address2?: string
    city: string
    state: string
    zip: string
    country: string
    [key: string]: any
}
