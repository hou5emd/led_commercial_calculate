import React from 'react';
import { VARS } from '../VARS.js';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost'

const TAPE_PROD = gql`
    query getTapeProd {
        tipyProdukcziis{
            id
            tapeName
        }
       }
`;

function SelTapeProd (){
    const { loading, error, data } = useQuery(TAPE_PROD);

    if (loading) return (
        <div>Подождите идет загрузка..</div>
    );
    if (error) return `Error! ${error.message}`;

    return (
        <select onChange={(e) => {getProducts(e)}}>
            <option>Выберите тип продукции</option>
            {data.tipyProdukcziis.map(item => (
                <option value={item.id}>
                    {item.tapeName}
                </option>
            ))}
        </select>
    );
}

function getProducts(e){
    VARS.typeOfProductID = e.target.value;
    console.log(VARS.typeOfProductID);
    VARS.renderCache.push(SelTapeProd);
}

export default SelTapeProd