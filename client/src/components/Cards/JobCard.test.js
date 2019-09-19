import React from 'react';
import { shallow} from 'enzyme';
import JobCard from './JobCard'

describe('JobCard',() => {
    it('should render correctly with no props', () => {
        const component = shallow(<JobCard />)
        expect(component).toMatchSnapshot();

    })
    
it('should render banner text correctly with given strings', () => {
    const strings = ['one', 'two'];
    const component = shallow(<JobCard list={strings} />);
    expect(component).toMatchSnapshot();
    });
})