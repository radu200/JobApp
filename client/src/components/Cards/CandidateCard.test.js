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

    it('should render banner text correctly with given props', () => {
        const candidate = [{
         avatar:'avatar',
         category:'category',
         first_name:'John',
         last_name:'Doe',
         job_seeker_about_me:'about me',
         job_seeker_location:'Paris',
         total_ex_years:0,
         userID:1
        }]
       
        const component = shallow(<CandidateCard candidate={candidate} />);
        expect(component).toMatchSnapshot();
      });

})

