/* Code Adaped From https://github.com/afonsopacifer/react-pomodoro,
https://medium.com/@650egor/react-30-day-challenge-day-1-simple-timer-df85d0867553
Code has been changed from basic timer and uses similar workings */

import React, { Component } from 'react';
import './style.css';
import { pomodoroTimer } from '../api';

export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            timeType: 0,
            pomodoroTimer: 'No Timer'
          };

        this.setWorkTimer = this.setTimer.bind(this, 1500);
        this.setShortBreakTimer = this.setTimer.bind(this, 300);
        this.setLongBreakTimer = this.setTimer.bind(this, 900);
        this.isOn = this.isOn.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.elapseTime = this.elapseTime.bind(this);
    }

    componentDidMount() {
        this.setStartTime();
    }

    elapseTime() {
        if(this.state.time === 0) {
            this.stopTimer(0)
        }
        if(this.state.isOn === true) {
            let liveTime = this.state.time -1;
            this.setState({ time: liveTime });
        }
    }

    // Formats the time into minutes and seconds
    timerFormat(seconds) {
        // https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
        let mins = Math.floor(seconds % 3600 / 60);
        let secs = Math.floor(seconds % 3600 % 60);
        // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
        let timeFormated = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs; 
        pomodoroTimer(timeFormated);
        return timeFormated ;
    }

    // Different Pomodoro times
    getFormatTypes() {
        return [
            {type: "work", time: 1500},
            {type: "shortBreak", time: 300},
            {type: "longBreak", time: 900}
        ];
    }

    formatType(timeType) {
        let timeTypes = this.getFormatTypes();
        for(let i = 0; i < timeTypes.length; i++) {
            let timerObject = timeTypes[i];
            if(timerObject.time === timeType) {
                return timerObject.type;
            }
        }
        return null;
    }

    // Resets the current time
    resetInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(this.elapseTime, 1000);
    }

    // Clears time and changes the state of the timer so it will start to countdown
    isOn() {
        if(true === this.state.isOn) return; 
        this.resetInterval();
        this.setState({ isOn: true });
        pomodoroTimer(this.state.resetInterval, this.state.isOn);
    }

    stopTimer(stop = this.state.time) {
        clearInterval(this.interval);
        // eslint-disable-next-line
        let time = this.timerFormat(stop);
        this.setState({ isOn: false });
    }

    toggleStartTimer() {
       if(true === this.state.isOn) {
           return this.stopTimer();
       } 
       return this.isOn();
    }

    setTimer(newTime) {
        this.resetInterval();
        this.setState({
            time: newTime,
            timeType: newTime,
            isOn: true
        });
    }

    setStartTime() {
        let startTime = 1500;
        this.setState({
            time: startTime,
            timeType: startTime,
            isOn: false
        });
    }

    toggleTimer(goToDirection) {
        let timeTypes = this.getFormatTypes();
        let currentPosition = -1;

        for(let j = 0; j < timeTypes.length; j++) {
            if(timeTypes[j].timer === this.state.timeType) {
                currentPosition = j;
            };
        };

        if(currentPosition !== -1) {
            let newTimer = timeTypes[currentPosition + goToDirection];
            if (newTimer) {
                this.setTimer(newTimer.time);
            }
        }
    }

    render() {

        return (
            <div className="main">
                <div className="container">
                    <span className="title">Pomodoro Timer</span>
                    
                    <div className="timer">
                        <span className="time">{this.timerFormat(this.state.time)}</span>
                    </div>
                    
                    <div className="options">
                        <button className="btn work" onClick={this.setWorkTimer}>Work</button>
                        <button className="btn shortBreak" onClick={this.setShortBreakTimer}>Short Break</button>
                        <button className="btn longBreak" onClick={this.setLongBreakTimer}>Long Break</button>
                    </div>

                    
                    <div className="controls">
                        <button className="btn startTimer" onClick={this.isOn}>Start</button>
                        <button className="btn stopTimer" onClick={this.stopTimer}>Stop</button>
                    </div>
                </div>
            </div>  
        );
    }
}
