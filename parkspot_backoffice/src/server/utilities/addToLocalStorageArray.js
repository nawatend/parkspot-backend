import {

    localStorage,

} from './localStorage';

export default function addToLocalStorageArray(oldData, plusNewData) {
    oldData.push(plusNewData);

    //console.log(oldData);
    localStorage.setItem('dataWithAddress', JSON.stringify(oldData));
}
