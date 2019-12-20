import io from 'socket.io-client';
const socket = io();

export const loadState = () => {
  try {
    const serializeState = localStorage.getItem("state");
    if (serializeState === null) {
      return undefined;
    }
    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
};


export const saveState = (state) => {
    try {
       const serializeState = JSON.stringify(state)
       localStorage.setItem('state', serializeState)
    } catch(err){
      return undefined
    }
}

// remove state from local storage with socket.io
export const removeState = () => {
  try {
    socket.on('removeLocalStorage', (callback) => {
      const serializeState =  localStorage.removeItem('state')
      if(serializeState === null){
        return undefined
      }
      return serializeState
    })
  } catch (err) {
     return undefined
  }
}