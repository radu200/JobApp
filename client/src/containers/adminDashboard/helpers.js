export const removeById = (payload, id) => {
   const data = payload.slice()
   return data.filter(data=> data.id !== id)
}