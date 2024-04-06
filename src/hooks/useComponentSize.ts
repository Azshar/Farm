import {useCallback, useState} from 'react';

type SizeType = {
  width: number;
  height: number;
};

const useComponentSize = (): [SizeType | null, (event) => void] => {
  const [size, setSize] = useState<SizeType | null>(null);

  const onLayout = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;
    setSize({width, height});
  }, []);

  return [size, onLayout];
};

export default useComponentSize;
