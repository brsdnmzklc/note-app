import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    note: {
        fontSize: 15,
        padding: 10
    },
    buttonContainer: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        width: width / 2,
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000'
    },
});
