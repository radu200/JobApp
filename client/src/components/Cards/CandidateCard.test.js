import React from 'react';
import { shallow} from 'enzyme';
import CandidateCard from './CandidateCard'

///component render with no props
///componentn reder with props


describe('CandidateCard',() => {
    it('should render correctly with no props', () => {
        const component = shallow(<CandidateCard />)
        expect(component).toMatchSnapshot();

    })
    // it('should render banner text correctly with given strings', () => {
    //     const strings = ['one', 'two'];
    //     const component = shallow(<CandidateCard list={strings} />);
    //     expect(component).toMatchSnapshot();
    //   });
})

