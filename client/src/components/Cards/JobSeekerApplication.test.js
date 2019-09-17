import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
configure({adapter: new Adapter()});
import JobSeekerApplication from './JobCard'

describe('CandidateCard',() => {
    it('should render correctly with no props', () => {
        const component = shallow(<JobSeekerApplication />)
        expect(component).toMatchSnapshot();

    })
    
it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<JobSeekerApplication list={strings} />);
    expect(component).toMatchSnapshot();
    });
})