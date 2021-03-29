import React from 'react';
import { VARS, numberWithSpacesInt, numberWithSpacesFloat} from '../VARS'
import { Page, Text, View, Document, Image, StyleSheet, Font  } from '@react-pdf/renderer';
import gilroyLight from './font/Gilroy-Light.ttf'
import circeNormal from './font/Circe-Regular.ttf'
import circe400 from './font/Circe-Regular.ttf'
import gilroy800 from './font/Circe-ExtraBold.ttf'


Font.register({ family: 'Gilroy', fonts: [
        { src: gilroyLight, fontWeight: 300 },
        { src: gilroy800, fontWeight: 800 },
        /*{ src: '../comp/font/Gilroy-Medium.ttf', fontWeight: 500 },
        { src: '../comp/font/Gilroy-SemiBold.ttf', fontWeight: 600 },
        { src: '../comp/font/Gilroy-Bold.ttf', fontWeight: 700 },
        { src: '../comp/font/Gilroy-ExtraBold.ttf', fontWeight: 800 },
        { src: '../comp/font/Gilroy-Heavy.ttf', fontWeight: 900 },*/


    ]});
Font.register({ family: 'Circe', fonts:[
        { src:circeNormal , fontWeight:'normal'},
        { src:circe400 , fontWeight: 400}
    ]});

//Top обязательно +3x
const styles = StyleSheet.create({
    text_1page: { position:'absolute', left:"257px", top: "317px", fontFamily:"Gilroy", fontWeight: 300, fontSize: 20, color:"#1f1f1f"},
    text_1page_person: { position:'absolute', left:"50px", top: "382px", fontFamily:"Gilroy", fontWeight: 300, fontSize: 16, color:"#1f1f1f"},
    text_1page_date: { position:'absolute', left:"50px", top: "408px", fontFamily:"Gilroy", fontWeight: 300, fontSize: 16, color:"#1f1f1f"},
    pageBG: { position: 'absolute', left: 0, top:0, width: '100vw', height:'100vh'},
    imgModule:{ position: 'absolute', left: "58px", top: "146px", width: '218px', height: '139px',},
    imgCabinet:{ position: 'absolute', left: "458px", top: "126px", width: '286px', height: '177px', },
    pixelStep:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "322px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12, },
    moduleSize:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "346px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    moduleResolution:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "370px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    pixelConfig:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "394px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    ledManufacture:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "418px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    ledLifeTime:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "442px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    refreshRateHertz:{ position: 'absolute', color:"#1f1f1f", left: "313px", top: "466px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    cabinetSize:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "322px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    tapeOfService:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "346px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    cabinetWeight:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "370px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    wattMaxM2:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "394px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    wattAverM2:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "418px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    contrast:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "442px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    ipWarranty:{ position: 'absolute', color:"#1f1f1f", left: "713px", top: "466px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    //стр3
    screenSize:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "100px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenResolution:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "124px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    cabinetSumm:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "148px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenWeight:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "172px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenService:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "196px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenTape:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "220px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    kandel:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "244px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    wattMaxAver:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "268px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    volt:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "292px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenIpWarranty:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "316px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    angleView:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "340px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    viewDistance:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "379px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    colorsSumm:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "403px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    tempMode:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "427px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,  width:116,},
    screenP:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "472px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenControl:{ position: 'absolute', color:"#1f1f1f", left: "676px", top: "496px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    screenPrice:{ position: 'absolute', color:"#1f1f1f", left: "306px", top: "103px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    sendingCardPrice:{ position: 'absolute', color:"#1f1f1f", left: "306px", top: "127px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    reciveCardPrice:{ position: 'absolute', color:"#1f1f1f", left: "306px", top: "151px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    serviceZip:{ position: 'absolute', color:"#1f1f1f", left: "306px", top: "175px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    pcPrice:{ position: 'absolute', color:"#1f1f1f", left: "306px", top: "199px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    instalationPrice:{ position: 'absolute', color:"#1f1f1f", left: "690px", top: "103px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    videoCPU:{ position: 'absolute', color:"#1f1f1f", left: "690px", top: "142px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    electroBox:{ position: 'absolute', color:"#1f1f1f", left: "690px", top: "166px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    electroProject:{ position: 'absolute', color:"#1f1f1f", left: "690px", top: "190px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    projectKM:{ position: 'absolute', color:"#1f1f1f", left: "690px", top: "214px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    agreementAdmin:{ position: 'absolute', color:"#1f1f1f", left: "690px", top: "238px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    priceSummImportant:{ position: 'absolute', color:"#ffffff", right: "462px", top: "282px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    priceSummAddons:{ position: 'absolute', color:"#ffffff", right: "86px", top: "282px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    fullPrice:{ position: 'absolute', color:"#ffffff", right: "77px", top: "519px",  fontFamily:'Circe', fontWeight: 'normal', fontSize: 12,},
    daysWay:{ position: 'absolute', color:"#1f1f1f", left: "126px", top: "381px",  fontFamily:'Gilroy', fontWeight: 800, fontSize: 14,},
    daysInstallation:{ position: 'absolute', color:"#1f1f1f", left: "126px", top: "469px",  fontFamily:'Gilroy', fontWeight: 800, fontSize: 14,},
    daysStarting:{ position: 'absolute', color:"#1f1f1f", left: "502px", top: "381px",  fontFamily:'Gilroy', fontWeight: 800, fontSize: 14,},
    daysSumm:{ position: 'absolute', color:"#1f1f1f", left: "502px", top: "469px",  fontFamily:'Gilroy', fontWeight: 800, fontSize: 14,},
    nameManager:{ position: 'absolute', color:"#1f1f1f", left: "92px", top: "138px",  fontFamily:'Circe', fontWeight: 400, fontSize: 16,},
    phoneManager:{ position: 'absolute', color:"#1f1f1f", left: "92px", top: "195px",  fontFamily:'Circe', fontWeight: 400, fontSize: 16,},
    mailManager:{ position: 'absolute', color:"#1f1f1f", left: "92px", top: "279px",  fontFamily:'Circe', fontWeight: 400, fontSize: 16,},
});

let date = new Date()
let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
};
// Create Document Component
export const MyDocument = () => (
    <Document>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str1[0].url.slice(1)} style={styles.pageBG} />
                <Text style={styles.text_1page}>{numberWithSpacesInt(VARS.screenSizeWidth)} x {numberWithSpacesInt(VARS.screenSizeHeight)} мм</Text>
                <Text style={styles.text_1page_person}>Для: {VARS.persona}</Text>
                <Text style={styles.text_1page_date}>Дата: {date.toLocaleString("ru", options)}</Text>
            </View>
        </Page>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str2[0].url.slice(1)} style={styles.pageBG} />
                <Image src={VARS.URL + VARS.module.photoModule[0].url.slice(1)} style={styles.imgModule} />
                <Image src={VARS.URL + VARS.cabinet.photoCabinet[0].url.slice(1)} style={styles.imgCabinet} />
                <Text style={styles.pixelStep}>{(VARS.module.ledStepHeight > 0) ? VARS.module.ledStep + 'x' + VARS.module.ledStepHeight:VARS.module.ledStep}</Text>
                <Text style={styles.moduleSize}>{VARS.module.moduleWidth}x{VARS.module.moduleHeight}</Text>
                <Text style={styles.moduleResolution}>{VARS.module.resolutionWidth}x{VARS.module.resolutionHeight}</Text>
                <Text style={styles.pixelConfig}>{VARS.module.pixelConfig}</Text>
                <Text style={styles.ledManufacture}>{VARS.module.ledManufacture}</Text>
                <Text style={styles.ledLifeTime}>{VARS.module.lifeTime}</Text>
                <Text style={styles.refreshRateHertz}>{VARS.module.refrashRateHertz}</Text>
                <Text style={styles.cabinetSize}>{(VARS.module.moduleHeight === VARS.cabinet.height)?"-":VARS.cabinet.width + "x" + VARS.cabinet.height}</Text>
                <Text style={styles.tapeOfService}>{VARS.cabinet.tapeOfService}</Text>
                <Text style={styles.cabinetWeight}>{VARS.cabinet.weight}</Text>
                <Text style={styles.wattMaxM2}>{VARS.module.powerInputMaxM2}</Text>
                <Text style={styles.wattAverM2}>{VARS.module.powerInputAverageM2}</Text>
                <Text style={styles.contrast}>{VARS.module.contrast}</Text>
                <Text style={styles.ipWarranty}>{VARS.cabinet.stepProtection}</Text>
            </View>
        </Page>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str3[0].url.slice(1)} style={styles.pageBG} />
                <Text style={styles.screenSize}>{VARS.screenSizeWidth} x {VARS.screenSizeHeight}</Text>
                <Text style={styles.screenResolution}>{VARS.screenResolutionW} x {VARS.screenResolutionH}</Text>
                <Text style={styles.cabinetSumm}>{VARS.cabinetSumm}</Text>
                <Text style={styles.screenWeight}>{VARS.screenWeight}</Text>
                <Text style={styles.screenService}>{VARS.cabinet.tapeOfService}</Text>
                <Text style={styles.screenTape}>{VARS.screenTape}</Text>
                <Text style={styles.kandel}>{VARS.module.kandel}</Text>
                <Text style={styles.wattMaxAver}>{VARS.maxKWT.toFixed(2)} / {VARS.avrKWT.toFixed(2)}</Text>
                <Text style={styles.volt}>220</Text>
                <Text style={styles.screenIpWarranty}>{VARS.cabinet.stepProtection}</Text>
                <Text style={styles.angleView}>{VARS.module.viewAngle}</Text>
                <Text style={styles.viewDistance}>{VARS.module.viewDistance}</Text>
                <Text style={styles.colorsSumm}>{VARS.module.quantityColors}</Text>
                <Text style={styles.tempMode}>{VARS.module.temperature}</Text>
                <Text style={styles.screenP}>{VARS.screenP.toFixed(1)}</Text>
                <Text style={styles.screenControl}>ПК/ПО</Text>
            </View>
        </Page>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str4[0].url.slice(1)} style={styles.pageBG} />
                <Text style={styles.screenPrice}>{numberWithSpacesFloat(VARS.priceOutLED.toFixed(2))} ₽</Text>
                <Text style={styles.sendingCardPrice}>{numberWithSpacesFloat(VARS.scrdPrice.toFixed(2))} ₽</Text>
                <Text style={styles.reciveCardPrice}>В стоимости</Text>
                <Text style={styles.serviceZip}>В стоимости</Text>
                <Text style={styles.pcPrice}>{(VARS.pcPrice !== 0 && VARS.pcPrice !== null)?numberWithSpacesFloat(VARS.pcPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.instalationPrice}>{(VARS.installationPrice !== 0 && VARS.installationPrice !== null)?numberWithSpacesFloat(VARS.installationPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.videoCPU}>{(VARS.videoCpuPrice !== 0 && VARS.videoCpuPrice !== null)?numberWithSpacesFloat(VARS.videoCpuPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.electroBox}>{(VARS.electroBoxPrice !== 0 && VARS.electroBoxPrice !== null)?numberWithSpacesFloat(VARS.electroBoxPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.electroProject}>{(VARS.electroProjectsPrice !== 0 && VARS.electroProjectsPrice !== null)?numberWithSpacesFloat(VARS.electroProjectsPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.projectKM}>{(VARS.projectKMPrice !== 0 && VARS.projectKMPrice !== null)?numberWithSpacesFloat(VARS.projectKMPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.agreementAdmin}>{(VARS.agreementPrice !== 0 && VARS.agreementPrice !== null)?numberWithSpacesFloat(VARS.agreementPrice.toFixed(2))+' ₽':"-"}</Text>
                <Text style={styles.priceSummImportant}>
                    {numberWithSpacesFloat(VARS.priceFullImportants.toFixed(2))} ₽
                </Text>
                <Text style={styles.priceSummAddons}>
                    {numberWithSpacesFloat(VARS.priceFullAddons.toFixed(2))} ₽
                </Text>
                <Text style={styles.fullPrice}>{numberWithSpacesFloat(VARS.fullPrice.toFixed(2))} ₽</Text>
                <Text style={styles.daysWay}>{(VARS.daysPost%10 === 1 && VARS.daysPost%100 !== 11)?VARS.daysPost + " рабочий день":VARS.daysPost + " рабочих дня"}</Text>
                <Text style={styles.daysInstallation}>{(VARS.daysInstall%10 === 1 && VARS.daysInstall%100 !== 11)?VARS.daysInstall + " рабочий день":VARS.daysInstall + " рабочих дня"}</Text>
                <Text style={styles.daysStarting}>{(VARS.daysStartingWork%10 === 1 && VARS.daysStartingWork%100 !== 11)?VARS.daysStartingWork + " рабочий день":VARS.daysStartingWork + " рабочих дня"}</Text>
                <Text style={styles.daysSumm}>{(VARS.daySumm%10 === 1 && VARS.daySumm%100 !== 11)?VARS.daySumm + " рабочий день":VARS.daySumm + " рабочих дня"}</Text>
            </View>
        </Page>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str5[0].url.slice(1)} style={styles.pageBG} />
            </View>
        </Page>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str6[0].url.slice(1)} style={styles.pageBG} />
            </View>
        </Page>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src={VARS.URL + VARS.shablon.str7[0].url.slice(1)} style={styles.pageBG} />
                <Text style={styles.nameManager}>{VARS.userActive.firstName + ' ' + VARS.userActive.lastName}</Text>
                <Text style={styles.phoneManager}>{VARS.userActive.phone}</Text>
                <Text style={styles.mailManager}>{VARS.userActive.email}</Text>
            </View>
        </Page>
    </Document>
);
