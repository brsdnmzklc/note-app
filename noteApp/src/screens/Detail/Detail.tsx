import React, {useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import styles from './Detail.style';
import axios from 'axios';

const Detail = ({route}) => {
    const {title, note, category, _id} = route.params.item;
    const {categories} = useSelector(s => s);
    const [newTitle, setNewTitle] = useState(title);
    const [newNote, setNewNote] = useState(note);
    const [newCategory, setNewCategory] = useState(category);
    const dispatch = useDispatch();
    const renderCategories = () => {
        return categories.map((e, i) => (
            <Picker.Item key={i.toString()} label={e.name} value={e.name}/>
        ));
    };

    const updateNote = async () => {
        try { 
            const response = await axios.post(
                'http://192.168.1.103:3000/updateNote',
                {
                    params: {
                        title: newTitle,
                        note: newNote,
                        category: newCategory,
                        create_at: route.params.item.create_at,
                        update_at: new Date().getDate(),
                        id: _id,
                    },
                },
            );
            console.log(response.data);
            dispatch({
                type: 'UPDATE_NOTE',
                payload: response.data,
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.title}
                value={newTitle}
                onChangeText={setNewTitle}
            />
            <TextInput
                style={styles.note}
                value={newNote}
                multiline={true}
                onChangeText={setNewNote}
            />
            <Picker
                selectedValue={newCategory}
                onValueChange={(itemValue, itemIndex) => setNewCategory(itemValue)}>
                {categories ? renderCategories() : null}
            </Picker>

            <TouchableOpacity onPress={updateNote} style={styles.buttonContainer}>
                <Text style={styles.buttonTitle}>Edit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Detail;
