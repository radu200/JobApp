import React from 'react';
import { shallow } from 'enzyme';
import JobSeekerApplication from './JobCard'

describe('CandidateCard',() => {
    it('should render correctly ', () => {
        const component = shallow(<JobSeekerApplication />)
        expect(component).toMatchSnapshot();

    })
    
})