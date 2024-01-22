import {io} from 'socket.io-client'

export const intiSocket =async()=>{
    const options={
        'force new connection':true,
        reconnectionAttempts:'Infinity',
        timeout: 3000,
        transports: ["websocket"] 
    }   
    return io('http://localhost:5000' ,options)
}