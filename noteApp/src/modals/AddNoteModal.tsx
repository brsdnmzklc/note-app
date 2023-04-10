import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const AddNoteModal = ({modalVisible, setModalVisible}) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Personal');
  const {categories} = useSelector(s => s) || [];
  const dispatch = useDispatch();
  const renderCategories = () => {
    return categories.map(e => <Picker.Item label={e.name} value={e.name} />);
  };
  const addNote = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.103:3000/insertNote',
        {
          params: {
            title: title,
            note: note,
            category: category,
            create_at: new Date().getDate(),
            update_at: '',
          },
        },
      );
      dispatch({type: 'INSERT_NOTE', payload: response.data});
      setModalVisible(!modalVisible);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput placeholder="ADD TITLE" onChangeText={setTitle} />
          <TextInput placeholder="ADD DESCRIPTION" onChangeText={setNote} multiline={true} />
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
            {categories ? renderCategories() : null}
          </Picker>

          <Pressable style={styles.button} onPress={addNote}>
            <Text style={styles.textStyle}>ADD</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>CANCEL</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddNoteModal;
