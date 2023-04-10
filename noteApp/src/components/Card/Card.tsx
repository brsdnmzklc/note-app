import React from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';
import styles from './Card.style';
import COLORS from '../../assets/COLORS';
import axios from "axios";
import {useDispatch} from "react-redux";

const Card = ({item, navigation}) => {
    const {title, note, category, _id} = item
    let shortNote = '';
    if (note.length > 50) {
        shortNote = note.slice(0, 100) + '...';
    } else {
        shortNote = note
    }
    const dispatch = useDispatch()
    console.log(_id)
    const deleteNote = async () => {
        try {
            const response = await axios.post('http://192.168.1.103:3000/deleteNote', {
                params: {
                    id: _id
                }

            })
            dispatch({type: 'DELETE_NOTE', payload: _id})
        } catch (e) {
            console.log(e)
        }
    }

    const buttonAlert = () =>
        Alert.alert('Are you sure?', 'This category will delete', [
            {text: 'DELETE', onPress: () => deleteNote()},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },

        ]);

    const navigationHandler = () => {
        navigation.navigate('Detail', {item})
    }
    return (
        <TouchableOpacity onPress={navigationHandler} onLongPress={buttonAlert}
                          style={{...styles.container, backgroundColor: COLORS(category)}}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.note}>{shortNote}</Text>
        </TouchableOpacity>
    );
};

export default Card;
