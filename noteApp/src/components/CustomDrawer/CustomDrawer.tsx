import React, {useEffect} from 'react';
import {ActivityIndicator, Alert, Image, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import styles from './CustomDrawer.style';

const CustomDrawer = ({navigation}) => {
    const dispatch = useDispatch();
    const categories = useSelector(s => s.categories);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get(
                    'http://192.168.1.103:3000/getAllCategories',
                );
                dispatch({type: 'GET_CATEGORIES', payload: response.data});

            } catch (e) {
                console.log(e);
            }
        };
        getCategories();

    }, []);

    const setCategory = category => {
        dispatch({type: 'SET_CATEGORY', payload: category});
        navigation.closeDrawer();
    };


    const deleteCategory = async (id) => {
        try {
            const response = await axios.post('http://192.168.1.103:3000/deleteCategory', {
                params: {
                    id: id
                }
            })
            dispatch({type: 'DELETE_CATEGORY', payload: id})
        } catch (e) {
            console.log(e)
        }
    }

    const buttonAlert = (id) =>
        Alert.alert('Are you sure?', 'This category will delete', [
            {text: 'DELETE', onPress: () => deleteCategory(id)},
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },

        ]);


    return categories ? (
        categories.map(e => (
            <TouchableOpacity
                onLongPress={() => buttonAlert(e._id)}
                key={e._id}
                style={styles.container}
                onPress={() => setCategory(e.name)}>
                <Image source={{uri: e.image_url}} style={styles.image}/>
                <Text style={styles.title}>{e.name}</Text>
            </TouchableOpacity>
        ))
    ) : (
        <ActivityIndicator size={30} color="#000"/>
    );
};

export default CustomDrawer;
