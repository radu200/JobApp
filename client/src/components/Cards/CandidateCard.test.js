import React from 'react';
import { shallow} from 'enzyme';
import CandidateCard from './CandidateCard'


describe('CandidateCard',() => {

    it('it renders the component correctly', () => {
            const props = {
                classes:{
                    bigAvatar:'avatar',
                    root:'root',
                    breakWord:'word',
                    aboutPage:'aboutPage',
                    RoomIcon:"roomIcon"
                },
                candidate:[{
                 avatar:'some-url-string',
                 category:'category',
                 first_name:'John',
                 last_name:'Doe',
                 job_seeker_about_me:'about me',
                 job_seeker_location:'Paris',
                 total_ex_years:0,
                 userID:1
                }]
             }
        const wrapper = shallow(<CandidateCard {...props}/>)
        expect(wrapper).toMatchSnapshot();

    })
            
})

