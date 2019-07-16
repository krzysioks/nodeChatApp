//const { h, render, Component } = require('preact');
import expect from 'expect';
//const expect = require('expect');
import { mount, configure, shallow } from 'enzyme';
//const { mount, configure, shallow } = require('enzyme');
import { Adapter } from 'enzyme-adapter-preact';
//const { Adapter } = require('enzyme-adapter-preact');
import Chat from './chat';
//const Chat = require('./chat');

configure({ adapter: new Adapter() });

describe('Chat Component', () => {
    it('should render Chat  Component', () => {
        const wrapper = shallow(<Chat path="/chat/:userName/:roomName" />);
        expect(wrapper.props().path).toEqual('/chat/:userName/:roomName');
    });
});
