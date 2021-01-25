import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermissions = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)

        this.setState({
            hasCameraPermissons: status === 'granted'
        });

    }

    render() {
        const hasCameraPermissons = this.state.hasCameraPermissons;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState === 'clicked' && hasCameraPermissons) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        } else if (buttonState === 'normal') {
            return (
                <View>
                    <Text>={

                        hasCameraPermissions === true ? this.state.scannedData : 'Request Camera Permission'
                    } </Text>

                    <TouchableOpacity
                        style={styles.scanButton}
                        onPress={this.getCameraPermissions}
                        title = 'Bar Code Scanner'>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>

                </View>
            )
        }

        <Image
          style={styles.imageIcon}
          source={{
            uri:
              '../assets/220px-Barcode-Scanner.jpg'
          }}
        />




    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    inputView: {
        flexDirection: 'row',
        margin: 20
    },
    inputBox: {
        width: 200,
        height: 40,
        borderWidth: 1.5,
        borderRightWidth: 0,
        fontSize: 20
    },
    scanButton: {
        backgroundColor: '#66BB6A',
        width: 50,
        borderWidth: 1.5,
        borderLeftWidth: 0
    }
});

