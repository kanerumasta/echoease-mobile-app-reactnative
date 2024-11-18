import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, Image, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

interface CarouselItem {
  title: string;
  description: string;
  color: string;
}

const EchoeaseCarousel: React.FC = () => {
  const data: CarouselItem[] = [
    {
      title: 'Find Talented Singers',
      description: 'Discover vocalists for any genre or event in just a few clicks.',
      color: '#FF5733',
    },
    {
      title: 'Streamlined Bookings',
      description: 'Effortlessly book and communicate with artists in one place.',
      color: '#33FF57',
    },
    {
      title: 'Personalized Recommendations',
      description: 'Get suggestions tailored to your needs and preferences.',
      color: '#5733FF',
    },
    {
      title: 'Transparent Reviews',
      description: 'Read genuine feedback to ensure the perfect match.',
      color: '#FFD700',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex,animated: true });
        return nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [data.length]);

  // Handle scrolling
  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image resizeMode='cover' style={{
                position: 'absolute',
                width:'100%',
                height:'100%',
                opacity: 0.5,
                borderRadius: 10,
                padding:10

            }} source={require('../../assets/images/carouselback1.jpg')}>

            </Image>
            <View style={{
                padding:10
            }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,


    paddingVertical: 20,height: '100%',
    overflow:'hidden'
  },
  card: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor:'rgba(0,0,0,1)',

    justifyContent: 'center',

    height: 200,
    position:'relative'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,

  },
  description: {
    fontSize: 16,
    color: '#fff',

  },
});

export default EchoeaseCarousel;
