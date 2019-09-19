import React from 'react';
import { shallow } from 'enzyme';
import CandidateDetailsCard from './CandidateDetailsCard'

describe('CandidateDetailsCard',() => {
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