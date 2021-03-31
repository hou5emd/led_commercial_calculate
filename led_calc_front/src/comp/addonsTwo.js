import React, {useContext, createRef} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts'
import {checkStatus, parseJSON} from "./resptests";

export class AddonsTwo extends React.Component {
    static contextType = CalcStateContext;
    state={
        installationsDWLD:false,
        installationsList:null,
        videoCpuDwld:false,
        videoCpuList:null,
        electroBoxDWLD:false,
        electroBoxList:null,
    }
    async componentDidMount() {
        try {
            const installations = await fetch(VARS.URL+'installations',{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (installations){
                this.setState({
                    installationsDWLD:true,
                    installationsList:installations,
                })
            }
            //Конец загрузки монтажа
            let videoCpu = await fetch(VARS.URL+'add-video-procs',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (videoCpu){
                this.setState({
                    videoCpuDwld:true,
                    videoCpuList:videoCpu,
                });
            }
            //Конец загрузки водео процов
            let electroBox = await fetch(VARS.URL+'electro-boxes',{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (electroBox){
                this.setState({
                    electroBoxDWLD:true,
                    electroBoxList:electroBox,
                });
            }
        } catch (e) {
            alert(e);
        }
    }

    nextStep = () => {
        const [context, setContext] = this.context;
        if (VARS.selectedInstallations !== null && VARS.selectedVideoCpu !== null && VARS.selectedElectroBox !== null){
            setContext(7);
        } else {
            alert("Индиана Джонс выбирал и ты давай!");
        }

    }

    onChangeInstallations = (e) => {
        VARS.selectedInstallations = this.state.installationsList[e.target.value];
        console.table(VARS.selectedInstallations);
    }
    onChangeVideoCpu = (e) => {
        VARS.selectedVideoCpu = this.state.videoCpuList[e.target.value];
        console.table(VARS.selectedVideoCpu);
    }
    onChangeElectroBox = (e) => {
        VARS.selectedElectroBox = this.state.electroBoxList[e.target.value];
        console.table(VARS.selectedElectroBox);
    }

    render() {
        //Рендер выбора монтажа
        let installations = <p>Загружаю типы монтажа...</p>;
        if (this.state.installationsDWLD){
            installations = <select onChange={event => this.onChangeInstallations(event)}>
                <option value="null" selected={true} disabled={true}>Выберите тип монтажа</option>
                {this.state.installationsList.map((item,key) => <option value={key}>{item.installationTape}</option> )}
            </select>
        }
        //Рендер выбора видео проца
        let videoCpus = <p>Загружаю список видео процессоров...</p>
        if (this.state.videoCpuDwld){
            videoCpus = <select onChange={event => this.onChangeVideoCpu(event)}>
                <option value={null} selected={true} disabled={true}>Выберите видео процессор</option>
                {this.state.videoCpuList.map((item,key) => <option value={key}>{item.videoCpuName}</option>)}
            </select>
        }
        //Рендер выбора электро щита
        let electroBox = <p>Загрузка типов щитов...</p>;
        if (this.state.electroBoxDWLD){
            electroBox = <select onChange={event => this.onChangeElectroBox(event)}>
                <option value={null} selected={true} disabled={true}>Выберите электро-щит</option>
                {this.state.electroBoxList.map((item,key) => <option value={key}>{item.electroBoxName}</option>)}
            </select>
        }
        return (
            <div>
                <label>
                    Выберите тип монтажа
                    {installations}

                </label>
                <label>
                    Выберите видео процессор
                    {videoCpus}
                </label>
                <label>
                    Выберите электро-щит
                    {electroBox}
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