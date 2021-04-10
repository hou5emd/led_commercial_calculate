import React, {useContext, createRef} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts'
import {checkStatus, parseJSON} from "./resptests";

export class AddonsThree extends React.Component{
    static contextType = CalcStateContext;
    state={
        electroProjectsDL:false,
        electroProjectsList:null,
        projectKMDL:false,
        projectKMList:null,
        admAgreeDL:false,
        admAgreeList:null,
    }
    async componentDidMount() {
        try {
            let electroProjects = await fetch(VARS.URL+'electro-projects',{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (electroProjects){
                this.setState({
                    electroProjectsDL:true,
                    electroProjectsList:electroProjects,
                });
            }
            //End dl el projects
            let projectKM = await fetch(VARS.URL+'project-constrs',{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (projectKM){
                this.setState({
                    projectKMDL:true,
                    projectKMList:projectKM,
                })

            }
            //End dl km
            let admAgreeList = await fetch(VARS.URL+'admin-agreements',{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (admAgreeList){
                this.setState({
                    admAgreeDL:true,
                    admAgreeList:admAgreeList,
                });

            }
            //End agree
        } catch (e) {
            alert(e);
        }
    }
    nextStep = () => {
        const [context, setContext] = this.context;
        if (VARS.selectedElectroProjects !== null && VARS.selectedProjectKM !== null && VARS.selectedAgree !== null){

            console.table(VARS);
            setContext(context+1);
        } else {
            alert("Индиана Джонс выбирал и ты давай!");
        }

    }
    onChangeElectroProjects = (e) => {
        VARS.selectedElectroProjects = this.state.electroProjectsList[e.target.value];
        console.table(VARS.selectedElectroProjects);
    }
    onChangeProjectKM = (e) => {
        VARS.selectedProjectKM = this.state.projectKMList[e.target.value];
        console.table(VARS.selectedProjectKM);
    }
    onChangeAdmAgree = (e) => {
        VARS.selectedAgree = this.state.admAgreeList[e.target.value];
        console.table(VARS.selectedAgree);
    }

    render() {
        //Рендер электропроектов
        let electroProjectsList = <p>Загрузка элетро-проектов...</p>
        if (this.state.electroProjectsDL){
            electroProjectsList = <select onChange={event => this.onChangeElectroProjects(event)}>
                <option value={null} selected disabled>Выберите электро-проект</option>
                {this.state.electroProjectsList.map((item,key) => <option value={key}>{item.tapeElectroProject}</option>)}
            </select>
        }
        //Рендер проектовКМ
        let projectKM = <p>Загрузка проектов констр. части....</p>;
        if (this.state.projectKMDL){
            projectKM = <select onChange={event => this.onChangeProjectKM(event)}>
                <option value={null} selected disabled>Выберите тип проекта констр. части</option>
                {this.state.projectKMList.map((item,key) => <option value={key}>{item.projectConstrName}</option>)}
            </select>
        }
        //рендор согласования
        let admAgree = <p>Загрузка типов согласования...</p>;
        if (this.state.admAgreeDL){
            admAgree = <select onChange={event => this.onChangeAdmAgree(event)}>
                <option value={null} selected disabled>Выберите тип согласования</option>
                {this.state.admAgreeList.map((item,key) => <option value={key}>{item.tapeAgreement}</option>)}
            </select>
        }
        return (
            <div>
                <label>
                    Выберите тип электро-проекта
                    {electroProjectsList}
                </label>
                <label>
                    Выберите проект конструкторской части
                    {projectKM}
                </label>
                <label>
                    Выберите тип согласования
                    {admAgree}
                </label>
                <button className={"bt second-bt"} onClick={() => {
                    const [context, setContext] = this.context;
                    setContext(context - 1);
                }}>Шаг назад
                </button>
                <button className={"bt primary1-bt"} onClick={this.nextStep}>Следующий шаг</button>
            </div>
        );
    }
}
