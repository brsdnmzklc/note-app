import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Home.style';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../components/Card/Card';
import AddNoteModal from '../../modals/AddNoteModal';
import AddNoteButton from '../../components/AddNoteButton/AddNoteButton';

const Home = ({navigation}) => {
  const {notes, currentCategory, categories} = useSelector(s => s);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const setVisible = () => {
    setModalVisible(!modalVisible);
  };

  const getNotes = async () => {
    try {
      if (currentCategory) {
        const response = await axios.get(
          'http://192.168.1.103:3000/getNotesByCategory',
          {
            params: {
              category: currentCategory,
            },
          },
        );
        dispatch({type: 'GET_NOTES', payload: response.data});
      } else {
        const response = await axios.get(
          'http://192.168.1.103:3000/getAllNotes',
        );
        dispatch({type: 'GET_NOTES', payload: response.data});
      }
    } catch (e) {
      console.log(e);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getNotes();
  }, [currentCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch({type: 'SET_CATEGORY', payload: null});
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {notes ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <FlatList
            numColumns={2}
            data={notes}
            renderItem={({item}) => (
              <Card key={item._id} item={item} navigation={navigation} />
            )}
          />
          <AddNoteModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator size={30} />
      )}
      <AddNoteButton setVisible={setVisible} />
    </View>
  );
};

export default Home;
