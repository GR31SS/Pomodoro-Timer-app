import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8001')

function pomodoroTimer(time) {
   socket.emit('pomodoroTimer', 1000, time);
}

export { pomodoroTimer }