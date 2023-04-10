import React from "react";
import {Image, TouchableOpacity} from "react-native";
import styles from './AddNoteButton.style'

const AddNoteButton = ({setVisible}) => {

    return <TouchableOpacity style={styles.container} onPress={setVisible}>
        <Image source={require('../../assets/addnote.png')}/>
    </TouchableOpacity>
}

export default AddNoteButton