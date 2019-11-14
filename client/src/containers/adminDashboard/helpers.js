//payload i mean data 
export const removeById = (payload, id) => {
   const data = payload.slice()
   return data.filter(data => data.id !== id)
}

export const filterByEmail = (payload, query) => {
    const data = payload.slice()
    return  data.filter(data => {
        const email = data.email.toLowerCase()
        const queryLowerCase = query.toLowerCase()
        return email.indexOf(queryLowerCase)  !== -1
   })
}