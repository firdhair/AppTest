import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useGetImagesQuery } from '../../api/pixabayApi';

const Home = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<any[]>([]); 
  const query = 'nature'; 

  const { data, error, isLoading, isFetching } = useGetImagesQuery({
    query,
    page,
  });

  useEffect(() => {
    if (data?.hits?.length) {
      console.log('hits baru:', data.hits); 
      setImages((prevImages) => [...prevImages, ...data.hits]);
    }
  }, [data]);

const renderItem = ({ item }: { item: any }) => {
  console.log('Rendering item:', item); // Debug log
  return (
    <View className="p-4 border-b border-gray-200">
      <Image
        source={{uri:item.webformatURL}}
        style={{width: 400, height: 400}}
        resizeMode="cover"
        onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)} // Debug error
      />
      <Text className="text-lg font-bold mt-2">{item.user} LINK: {item.webformatURL}</Text>
      <Text className="text-gray-600">{item.tags}</Text>
    </View>
  );
};

  const loadMoreData = useCallback(() => {
    if (!isFetching && data?.hits?.length) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, data?.hits]);

  if (isLoading && page === 1) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Error ketika memproses gambar. Tolong coba kembali.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.id}-${index}`} 
      onEndReached={loadMoreData} 
      onEndReachedThreshold={0.5} 
      ListFooterComponent={
        isFetching ? (
          <View className="py-4">
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
    />
  );
};


export default Home;
