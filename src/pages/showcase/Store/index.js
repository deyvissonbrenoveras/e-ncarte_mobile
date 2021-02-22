import React, { useEffect } from 'react';

import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest } from '~/store/modules/showcase/actions';

function Store({ route }) {
  const dispatch = useDispatch();
  const { showcase } = useSelector((state) => state.showcase);
  const { storeURL } = route.params;

  useEffect(() => {
    dispatch(loadRequest(storeURL));
  }, []);
  return (
    <Text>
      {showcase &&
        showcase.products.map((product) => (
          <Text key={product.id}>{product.name}</Text>
        ))}
    </Text>
  );
}

export default Store;
