const io = require('socket.io')();

io.on('connection', (client) => {
    // here you can start emitting events to the client
    client .on('pomodoroTimer', (interval, time) => {
       console.log('Client has connected to the Pomodoro Timer with Intervals: ', interval);
       console.log('Current Timer Status', time);
    });
});

const port = 8001;
io.listen(port);
console.log('listening on port ' + port);
