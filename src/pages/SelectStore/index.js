import React, { useEffect } from 'react';

import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// import { Container } from './styles';
import { loadStoresRequest } from '~/store/modules/store/actions';

function SelectStore() {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(loadStoresRequest());
  }, []);

  return (
    <View>{stores && stores.map((store) => <Text>{store.name}</Text>)}</View>
  );
}

export default SelectStore;
