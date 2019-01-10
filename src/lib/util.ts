import Guid from 'guid';

export const guid = ():string => Guid.create().value;