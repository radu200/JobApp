import React from 'react';
import PropTypes from 'prop-types';


const GetMoreCandidatesButton =  ({onclick}) => {
    return(
        <button onClick={onclick}>GetMore</button>
    )
}

GetMoreCandidatesButton.propTypes = {
    onclick:PropTypes.func.isRequired
}
export default GetMoreCandidatesButton;

