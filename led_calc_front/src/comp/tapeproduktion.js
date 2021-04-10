import React, { useContext, useState } from 'react';
import { VARS } from '../VARS.js';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import ListModules from './tepeoflednodule'
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
    const [modules, setModules] = useState(<p className={'wait'}>Жду выбора типа размещения...</p>);



    if (loading) return (
        <div>Подождите идет загрузка..</div>
    );
    if (error) return `Error! ${error.message}`;

    const getProducts = (e) => {
        VARS.cabinet.id = -1;
        VARS.typeOfProductID = e.target.value;
        console.log(VARS.typeOfProductID);
        setModules(<ListModules typeOfProductID={VARS.typeOfProductID}/>);






    }

        return (
            <div className={'tapeOfProd'}>
                <select onChange={(e) => {getProducts(e)}} value={VARS.typeOfProductID}>
                    <option disabled={true} selected value={null}>Выберите тип размещения</option>
                    {data.tipyProdukcziis.map(item => (
                        <option value={item.id}>
                            {item.tapeName}
                        </option>
                    ))}
                </select>
                {modules}
            </div>

    );

}

