import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Button, DimensionValue, TextInput} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import StyleModalStyle from './modalAddStyle';
import {mkdir, ReadDirItem, writeFile} from "react-native-fs";
import * as path from "node:path";


interface Props {
    path:string;
    onClick: ()=> void;
}
function ModalAddDirectory({path, onClick}: Props) {
    const [modalVisible, setModalVisible] = useState(false);
        const [text, onChangeText] = React.useState('Useless Text');
        const [number, onChangeNumber] = React.useState('');
        async function Criar(){
            if(text == ""){
                return;
            }

            const pt = path + '/' + text;
            console.log(text.includes("."))
            const File = text.includes(".")
            if(File){
                await writeFile(pt,'').catch((error) => {
                    console.log({error})
                });
                setModalVisible(false);
                onClick()
                //Não está deixando criar arquivos
                return;
            }
            mkdir(pt);
            setModalVisible(false);
            onClick();
            return;

        }
        return (
            <View style={StyleModalStyle.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={StyleModalStyle.centeredView}>
                        <View style={StyleModalStyle.modalView}>
                        <Button title={'X'} onPress={() => setModalVisible(!modalVisible)}/>
                            <Text style={StyleModalStyle.modalText}>Type below what you want to create</Text>
                            <TextInput
                                style={StyleModalStyle.input}
                                onChangeText={onChangeText}
                                value={text}
                            />
                            <Pressable
                                style={[StyleModalStyle.button, StyleModalStyle.buttonClose]}
                             onPress={() => Criar()}
                            >
                                <Text style={StyleModalStyle.textStyle}>Add</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[StyleModalStyle.button, StyleModalStyle.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={StyleModalStyle.textStyle}>+Create</Text>
                </Pressable>
            </View>
        );
    }

export default ModalAddDirectory;