import React from 'react';
import reducers from './reducers';
import initialState from './store';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const AppProvider = ({children}) => {
    const store = createStore(reducers,initialState );

    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
