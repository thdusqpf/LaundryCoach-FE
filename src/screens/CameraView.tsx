import React, { useCallback, useEffect, useRef, useState} from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Platform } from "react-native";
import { useCameraPermission, Camera, useCameraDevice, PhotoFile } from "react-native-vision-camera";
import { AnalysisResult, LoadingScreen } from ".";
import { uploadData } from 'aws-amplify/storage';
import uuid from 'react-native-uuid';

function NoCameraDeviceError() {
    return (
        <SafeAreaView>
            <View>
                <Text>No Camera Device Error!!</Text>
            </View>
        </SafeAreaView>
    )
}

export default function CameraView({navigation}) {
    const { hasPermission, requestPermission } = useCameraPermission()
    let device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    const [showCamera, setShowCamera] = useState(true);
    const [photos, setPhotos] = useState<PhotoFile[]>([]);
    console.log(hasPermission)
    


    useEffect(() => {
        requestPermission();
      }, []);

    const onPressButton = async () => {
        if (!camera.current) return;
        const photo = await camera.current.takePhoto({
            flash: 'off'
        });
        const res = await fetch(`file://${photo.path}`)
        const imagedata = await res.blob();
        try {
            const result = await uploadData({
                key: `${uuid.v4()}.png`,
                data: imagedata,
                options: {
                    contentType: "image/png"
                }
            }).result;
            console.log('Succeeded: ', result);
        } catch (error) {
        console.log('Error : ', error);
        }
        setPhotos([...photos, photo]);
        setShowCamera(false);
      };

    
    if (device == null) return <NoCameraDeviceError />
    return !hasPermission ? (
        <>
        <LoadingScreen />
        </>
    ) : (
        <>
            {device && showCamera && (
                <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} photo={true} ref={camera} />
            )}
            {showCamera && (
                <View style={styles.viewspace}>
                    <TouchableOpacity style={styles.cameraButton} onPress={onPressButton}/>
                </View>
            )}
            {photos && photos.length > 0 && (
                <SafeAreaView>
                    <View style={{ width: '100%', height: 700 }}>
                        {photos.map((photo, index) => (
                            <View key={index}>
                                <Image
                                    style={{ width: '100%', height: '100%'}}
                                    source={{ uri: 'file://' + photo.path }}
                                    resizeMode="stretch"
                                />
                            </View>
                        ))}
                    </View>
                    <View style={styles.showPhotoView}>
                        <TouchableOpacity style={styles.showPhotoButton} onPress={() => navigation.navigate(AnalysisResult)}>
                            <Text style={styles.showPhototext}>세탁 라벨 분석하기</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )}
        </>
    );
}    
const styles = StyleSheet.create({
    cameraButton: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: '#0057FF',
        borderWidth:2,
        borderColor: 'white'
    },
    viewspace: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: Platform.select({ios:100, android: 50})
    },
    showPhotoView: {
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'center'
    },
    showPhotoButton: {
        borderRadius: 10,
        backgroundColor: '#1472FF',
        width: 120,
        height: 50,
        justifyContent:'center',
        flex: 1,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10
    },
    showPhototext: {
        fontFamily:'NanumSquareNeo-dEb',
        fontSize: 16,
        color: 'white',
        textAlign:'center'
    }
})