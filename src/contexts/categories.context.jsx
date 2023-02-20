import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const categoriesContext = createContext({
    categoriesMap: {},
});




export const CategoriesProvider = ({children}) => {
    const [categoriesMap,setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoriesMap);
        }

        getCategoriesMap();
    },[])

    return <categoriesContext.Provider value={value}>{children}</categoriesContext.Provider>
}