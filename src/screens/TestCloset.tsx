import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { Wash, Bleach, Dry, Iron, Dryclean, CollapsibleViewCheck} from '.';


const TestCloset = ({item, onCreate, handleUpdate, onItemUpdate, saveSymbols, handleCancle}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCheckModalVisible, setCheckModalVisible] = useState(false);


  const handleSave = (selectedItems) => {
    // 모달을 닫기 전에 선택된 항목을 저장하고 부모 컴포넌트에 전달
    onSave(selectedItems);
    // 모달을 닫음
    // setIsCollapsed(true);
    setCheckModalVisible(!isCheckModalVisible);
};

const handleSymbolsSave = (item, selectedSymbols) => {
  // 모달을 닫기 전에 선택된 항목을 저장하고 부모 컴포넌트에 전달
  saveSymbols(selectedSymbols);
  // 모달을 닫음
  // setIsCollapsed(true);
  setCheckModalVisible(!isCheckModalVisible);
};

  const onSave = (selectedItems) => {
    handleUpdate(selectedItems);
  };
    const [selectedImage, setSelectedImage] = useState(null);
    const [newName, setNewName] = useState('');
    const [newSymbols, setNewSymbols] = useState([]);
    const [newNote, setNewNote] = useState('');

        return (
            <Modal
                style={styles.modalView}
                animationType="slide"
                transparent={true}
                visible={isCheckModalVisible}
                onRequestClose={() => {
                setModalVisible(!isCheckModalVisible);
            }}
            >
            <ScrollView style={styles.modalView}>
                <CollapsibleViewCheck 
                    title="세탁"
                    className="Wash"
                    classImage={require("../../assets/images/Wash/Wash.png")}
                    content={Wash}
                    color="#92D3F5"
                    item={item} 
                    handleUpdate={handleUpdate} 
                    handleCancle={handleCancle}
                    handleSave={handleSave}
                    saveSymbols={saveSymbols}
                ></CollapsibleViewCheck>
                <CollapsibleViewCheck
                    title="표백"
                    className="Bleach"
                    classImage={require("../../assets/images/Bleach/Bleach.png")}
                    content={Bleach}
                    color="#F5B692"
                    item={item} 
                    handleUpdate={handleUpdate} 
                    handleCancle={handleCancle}
                    handleSave={handleSave}
                    saveSymbols={saveSymbols}
                />
                <CollapsibleViewCheck
                    title="건조"
                    className="Dry"
                    classImage={require("../../assets/images/Dry/Dry.png")}
                    content={Dry}
                    color="#F5DF92"
                    item={item} 
                    handleUpdate={handleUpdate} 
                    handleCancle={handleCancle}
                    handleSave={handleSave}
                    saveSymbols={saveSymbols}
                />
                <CollapsibleViewCheck
                    title="다림"
                    className="Iron"
                    classImage={require("../../assets/images/Iron/Iron.png")}
                    content={Iron}
                    color="#88DBA4"
                    item={item} 
                    handleUpdate={handleUpdate} 
                    handleCancle={handleCancle}
                    handleSave={handleSave}
                    saveSymbols={saveSymbols}
                />
                <CollapsibleViewCheck
                    title="드라이클리닝"
                    className="Dryclean"
                    classImage={require("../../assets/images/Dryclean/Dryclean.png")}
                    content={Dryclean}
                    color="#C3A0E6"
                    item={item} 
                    handleUpdate={handleUpdate} 
                    handleCancle={handleCancle}
                    handleSave={handleSave}
                    saveSymbols={saveSymbols}
                />
                <Pressable style={styles.symbolBtn} onPress={handleSymbolsSave}>
                    <Text style={styles.symbolBtnText}>완료</Text>
                </Pressable>
                </ScrollView>
                
            </Modal>
        );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    marginTop:120,
    width: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView:{
    marginTop:260,
    width: '90%',
    height:"auto",
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },
  symbolBtn:{
    width:330,
    height:50,
    backgroundColor:"#1472FF",
    alignSelf:"center",
    borderRadius: 10,
    marginTop:30,
  },
  symbolBtnText:{
    color:"white",
    textAlign:"center",
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 18,
    padding:15,
  },
  header:{
    marginTop:20,
    marginLeft: 20,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign:"center",
  },
  headerImage:{
    width:60,
    height:60,
    opacity: 0.5
  },
  headerImageText:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  pickImageButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  inputContainer: {
    margin: 10,
    width: '80%',
  },
  symbols:{
    flexDirection:"row",
  },
  symbol:{
    marginRight: 10,
    
  },
  contextTitle:{
    fontFamily: 'NanumSquareNeo-cBd',
    fontSize: 15,
    marginTop: 25,
    marginBottom:10, 
  },
  nameInput: {
    marginLeft:60,
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 3,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default TestCloset;