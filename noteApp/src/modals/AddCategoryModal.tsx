import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const AddCategoryModal = ({modalVisible, setVisible}) => {
  const [categoryName, setCategoryName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  const addCategory = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.103:3000/insertCategory',
        {
          params: {
            name: categoryName,
            image_url: imageUrl,
          },
        },
      );
      dispatch({
        type: 'INSERT_CATEGORY',
        payload: response.data,
      });
      setVisible(!modalVisible);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setCategoryName}
              placeholder="Category Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={setImageUrl}
              placeholder="Image Url"
            />
            <View style={styles.buttonContainer}>
              <Pressable style={styles.button} onPress={addCategory}>
                <Text style={styles.addTextStyle}>Add</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={setVisible}>
                <Text style={styles.cancelTextStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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
  button: {
    paddingHorizontal: 10,
  },
  addTextStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelTextStyle: {
    color: '#000',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default AddCategoryModal;
