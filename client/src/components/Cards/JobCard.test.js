import React from 'react';
import { shallow} from 'enzyme';
import JobCard from './JobCard'

describe('JobCard',() => {
    it('should render correctly ', () => {
        const component = shallow(<JobCard />)
        expect(component).toMatchSnapshot();

    })

})