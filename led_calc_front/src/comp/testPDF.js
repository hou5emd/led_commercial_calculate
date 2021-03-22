import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet, Font  } from '@react-pdf/renderer';
import gilThin from './font/Gilroy-Thin.ttf'
import gilUlLight from './font/Gilroy-UltraLight.ttf'
import gilroyLight from './font/Gilroy-Light.ttf'
import gilroyRegular from './font/Gilroy-Regular.ttf'


Font.register({ family: 'Gilroy', fonts: [
        { src: gilThin, fontWeight: 100 },
        { src: gilUlLight, fontWeight: 200 },
        { src: gilroyLight, fontWeight: 300 },
        { src: gilroyRegular, fontWeight: 400 },
        { src: '../comp/font/Gilroy-Medium.ttf', fontWeight: 500 },
        { src: '../comp/font/Gilroy-SemiBold.ttf', fontWeight: 600 },
        { src: '../comp/font/Gilroy-Bold.ttf', fontWeight: 700 },
        { src: '../comp/font/Gilroy-ExtraBold.ttf', fontWeight: 800 },
        { src: '../comp/font/Gilroy-Heavy.ttf', fontWeight: 900 },


    ]});


const styles = StyleSheet.create({
    text1: { position:'absolute', left:'256.43px', top: '313px', fontFamily:'Gilroy', fontStyle: 'normal', fontWeight: 300, fontSize: 18},

});

// Create Document Component
export const MyDocument = () => (
    <Document>
        <Page size="A4" orientation="landscape" >
            <View >
                <Image src="http://localhost:1337/uploads/A4_1_310b018592.png" />
                <Text style={styles.text1}> 10 000 x 6 000</Text>
            </View>
        </Page>
    </Document>
);
