import React, {useContext, createRef} from 'react'
import { VARS } from '../VARS'
import { CalcStateContext } from './contexts'
import {checkStatus, parseJSON} from "./resptests";


export class AddonsOne extends React.Component {
    state={
        downloadPC:false,
        pcs:null,
        downloadSC:false,
        sendingCards:null,
        monitorsDL:false,
        monitorsList:null,
    }
    static contextType  = CalcStateContext;

    async componentDidMount(){
        try {
            const requestPC = await fetch(VARS.URL + 'add-pcs', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjE2MDg1NDUwLCJleHAiOjE2MTg2Nzc0NTB9.S3iICAYvJlQvcuvzg42mQbqdvCfO4i0qQozz2iFszT4"
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (requestPC) {
                this.setState({
                    downloadPC: true,
                    pcs: requestPC,
                });
            }
            const requestSending = await fetch(VARS.URL + 'add-sendings', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (requestSending) {
                this.setState({
                    downloadSC: true,
                    sendingCards: requestSending,
                });
            }
            const monitorList = await fetch(VARS.URL+'add-monitors',{
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": VARS.AUTORIZ,
                }
            })
                .then(checkStatus)
                .then(parseJSON);
            if (monitorList){
                this.setState({
                    monitorsDL:true,
                    monitorsList:monitorList,
                });
            }

        } catch (e) {
            alert(e);
        }
    }

    onChangePCS(e){
        VARS.selectedPC = this.state.pcs[e.target.value];
        console.table(VARS.selectedPC);
    }
    onChangeMonitor(e){
        VARS.selectedMonitor = this.state.monitorsList[e.target.value];
        console.table(VARS.selectedMonitor);

    }
    onChangeSCRD(e){
        VARS.selectedSCRD = this.state.sendingCards[e.target.value];
        console.table(VARS.selectedSCRD);
    }
    onChangeSCRDPts(e){
        if (e.target.value) {
            VARS.selectedSCRDcount = e.target.value;
        } else {
            VARS.selectedSCRDcount = 1;
        }
        console.table(VARS.selectedSCRDcount);
    }

    nextStep = () => {
        const [context, setContext] = this.context;
        if (VARS.selectedPC !== null && VARS.selectedSCRD !== null && VARS.selectedMonitor !== null) {

            console.log(VARS);
            setContext(6);
        } else {
            alert("Выбирай правильно и с умом!");
        }
    }

    render() {
        let pcs = <p>Загрузка списка ПК...</p>;
        if (this.state.downloadPC === true){
            pcs = <select onChange={event => this.onChangePCS(event)}>
                <option value="null" selected={true} disabled={true}>Выберите компьютер</option>
                {this.state.pcs.map((item,key) => <option value={key}>{item.pcName}</option>)}
            </select>;
        }
        let monitorSel = <p>Загрузка списка мониторов...</p>;
        if (this.state.monitorsDL){
            monitorSel = <select onChange={event => this.onChangeMonitor(event)}>
                <option value={null} selected disabled>Выберите монитор</option>
                {this.state.monitorsList.map((item,key) => <option value={key}>{item.monitorName}</option>)}
            </select>
        }
        let sendingsCard = <p>Загрузка списка отправляющих карт....</p>;
        if (this.state.downloadSC === true){
            sendingsCard = <select onChange={event => this.onChangeSCRD(event)}>
                <option value="null" selected={true} disabled={true}>Выберите отправляющую карту</option>
                {this.state.sendingCards.map((item,key) => <option value={key}>{item.sendControllerName}</option>)}
            </select>;
        }
        let alert1 = <alert>Важно учитывать что разрешение будущего экрана {VARS.screenResolutionW} x {VARS.screenResolutionH}</alert>
        return (
            <div>
                <label>Выберите управляющий компьютер
                    {pcs}
                </label>
                <label>Выберите монитор
                    {monitorSel}
                </label>
                <label>Выберите отправляющую карту
                    {sendingsCard}
                </label>
                <label>Введите количество отправляющих карт
                    <input type="number" defaultValue="1" min="1" max="999" step="1" onChange={event => this.onChangeSCRDPts(event)}/>
                </label>
                <button className={"bt primary1-bt"} onClick={() => {
                    const [context, setContext] = this.context;
                    setContext(context-1);
                }}>Шаг назад</button>
                <button className={"bt primary1-bt"} onClick={this.nextStep}>Следующий шаг</button>
                {alert1}
            </div>
        );
    }

}