import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const cardWidth = width / 2;
const cardHeigth = height / 4;
export default StyleSheet.create({
  container: {
    flex: 1,
    height: cardHeigth,
    maxWidth: cardWidth,
    // alignItems: 'center',
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,

    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  note: {
    fontSize: 15,
    color: '#fff',
  },
  category: {
    fontSize: 16,
    color: '#fff',
  },
});
