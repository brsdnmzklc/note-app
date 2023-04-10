import React, {useState} from "react";
import {Image, Text, TouchableOpacity} from "react-native";
import styles from './AddCategory.syle'
import AddCategoryModal from "../../modals/AddCategoryModal";
const AddCategory = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const setVisible = () => {
        setModalVisible(!modalVisible)
    }

    return <TouchableOpacity style={styles.container} onPress={setVisible}>
        <Image style={styles.icon} source={require('../../assets/add.png')}/>
        <Text style={styles.title}>Add Category</Text>
        <AddCategoryModal modalVisible={modalVisible} setVisible={setVisible}  />
    </TouchableOpacity>
}

export default AddCategory