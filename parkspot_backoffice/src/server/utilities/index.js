import APIError, {
    handleAPIError,
} from './errorHandler';
import logger from './logger';
import {
    createToken,
    generateToken,
    getToken,
    sendToken,
} from './token';
import distance from './calcDistanceTwoPoints';
import compare from './sort';
import toOneJSONStructure from './toOneJSONStructure';
import ascendArray from './ascendArray';
import addToLocalStorageArray from './addToLocalStorageArray';
import {
    localStorage,
} from './localStorage';

export {
    APIError,
    handleAPIError,
    logger,
    createToken,
    generateToken,
    getToken,
    sendToken,
    distance,
    compare,
    toOneJSONStructure,
    ascendArray,
    addToLocalStorageArray,
    localStorage,

};
