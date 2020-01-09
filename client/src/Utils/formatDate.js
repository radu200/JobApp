import * as moment from 'moment';

export const formatDate = date => {
    return moment(date).locale('ro').format('LLL')

}