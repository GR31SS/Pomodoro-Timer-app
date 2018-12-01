import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from './components/timer';

configure({ adapter: new Adapter() });

describe('<Timer /> tests of default settings', () => {
    var component;

    beforeEach(() => {
        component = shallow(<Timer />);
        
    });

    it('Test if default states are correct', () => {
        expect(component.state('isOn')).toBeFalsy();
        expect(component.state('time')).toEqual(1500);
    });

    it('Should be buttons to Start and Stop',() => {
        let controls = component.find('div.main div.controls button');

        expect(controls.length).toEqual(2);

        let startButton = controls.find('.startTimer').getElement,
        stopButton = controls.find('.stopTimer').getElement;

        expect(startButton).toBeDefined();
        expect(stopButton).toBeDefined();
    });

    it('Should be three buttons to toggle timer', () => {
        let timerToggles = component.find('div.main div.options button');

        expect(timerToggles.length).toEqual(3);

        let workButton = timerToggles.find('.work').getElement,
        shortBreakButton = timerToggles.find('.shortBreak').getElement,
        longBreakButton = timerToggles.find('.longBreak').getElement;

        expect(workButton).toBeDefined();
        expect(shortBreakButton).toBeDefined();
        expect(longBreakButton).toBeDefined();
    });
});

describe('<Timer /> test timer functionality', () => {
    var component;

    beforeEach(() => {
        component = shallow(<Timer />);
    });

    it('The state should change when the start button is clicked', () => {
        let startButton = component.find('div.main div.controls button.startTimer');

        expect(component.state('isOn')).toBeFalsy();
        startButton.simulate('click');
        expect(component.state('isOn')).toBeTruthy();
    });

    it('When the short break button is clicked the state of the timer should change', () => {
        let shortBreakButton = component.find('div.main div.options button.shortBreak');

        shortBreakButton.simulate('click');

        expect(component.state('isOn')).toBeTruthy();
        expect(component.state('time')).toEqual(300);
    });

    it('When the long break button is clicked the state of the timer should change', () => {
        let longBreakButton = component.find('div.main div.options button.longBreak');

        longBreakButton.simulate('click');

        expect(component.state('isOn')).toBeTruthy();
        expect(component.state('time')).toEqual(900);
    });
});
