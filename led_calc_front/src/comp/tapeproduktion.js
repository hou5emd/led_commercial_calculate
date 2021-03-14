import React, { useContext } from 'react';
import { VARS } from '../VARS.js';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { CalcStateContext } from './contexts';


const TAPE_PROD = gql`
    query getTapeProd {
        tipyProdukcziis{
            id
            tapeName
        }
       }
`;

export function SelTapeProd (){
    const { loading, error, data } = useQuery(TAPE_PROD);
    const [context, setContext] = useContext(CalcStateContext);

    if (loading) return (
        <div>Подождите идет загрузка..</div>
    );
    if (error) return `Error! ${error.message}`;

    const getProducts = (e) => {
        console.log(context);
        VARS.typeOfProductID = e.target.value;
        console.log(VARS.typeOfProductID);
        VARS.renderStep += 1;
        setContext(2);
    }



        return (
        <select onChange={(e) => {getProducts(e)}}>
            <option disabled={true} selected>Выберите тип продукции</option>
            {data.tipyProdukcziis.map(item => (
                <option value={item.id}>
                    {item.tapeName}
                </option>
            ))}

        </select>

    );

}
