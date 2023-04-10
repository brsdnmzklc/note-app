import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer/CustomDrawer';
import Detail from './src/screens/Detail/Detail';
import Home from './src/screens/Home/Home';
import AppProvider from './src/context/AppProvider';
import AddCategory from './src/components/AddCategory/AddCategory';
import AddNoteButton from './src/components/AddNoteButton/AddNoteButton';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => {
          return (
            <>
              <CustomDrawer {...props} />
              <AddCategory />
            </>
          );
        }}
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitle: 'NOTE APP',
          headerTitleStyle: {fontSize: 15, fontWeight: '500', color: '#fff'},
          headerStyle: {backgroundColor: '#13245453'},
          headerTintColor: '#fff',
        }}>
        <Drawer.Screen name="Drawer" component={StackScreens} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};
