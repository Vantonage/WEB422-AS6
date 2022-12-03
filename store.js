import { atom } from 'jotai';


// async function defaultValues(){

//     const favourite = [];

//     return favourite;
// }


// export const favouritesAtom = atom(defaultValues());


export const favouritesAtom = atom([]);

export const searchHistoryAtom = atom([]);