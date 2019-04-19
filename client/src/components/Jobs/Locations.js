import React from 'react';

const cities = ['chisinau', 'Balti', 'Cahul',"Ungheni" ];

const SelectLocation = () => {

    return cities.map((city,index ) => {
        return (
          <option key={index}>{city}</option>
        )
      })
}

export default SelectLocation;