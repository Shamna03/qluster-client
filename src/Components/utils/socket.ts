import {io} from 'socket.io-client'


const socket = io("https://localhost:5006")

export default socket;