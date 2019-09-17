import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});
import CandidateDetailsCard from './CandidateDetailsCard'

describe('CandidateCard',() => {
    it('should render correctly with no props', () => {
        const component = shallow(<CandidateDetailsCard />)
        expect(component).toMatchSnapshot();

    })
    it('should render banner text correctly with given strings', () => {
        const strings = ['one', 'two'];
        const component = shallow(<CandidateDetailsCard list={strings} />);
        expect(component).toMatchSnapshot();
      });
})