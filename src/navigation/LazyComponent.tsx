import {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

const LazyComponent = (
  importFunc: () => Promise<{default: React.ComponentType<any>}>,
) => {
  return function LazyScreen(props: any) {
    const [Component, setComponent] = useState<React.ComponentType<any> | null>(
      null,
    );

    useEffect(() => {
      let isMounted = true;
      importFunc().then(module => {
        if (isMounted) setComponent(() => module.default);
      });
      return () => {
        isMounted = false;
      };
    }, []);

    if (!Component) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }

    return <Component {...props} />;
  };
};

export default LazyComponent;
