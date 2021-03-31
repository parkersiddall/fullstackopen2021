import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const addToDB = (person) => {
     return axios.post(baseUrl, person)
}

const deleteFromDB = (id) => {
    return axios.delete(baseUrl + `/${id}`)
}

const updateDB = (person) => {
    return axios.put(baseUrl + `/${person.id}`, person)
}

export default {
    addToDB,
    deleteFromDB,
    updateDB
}