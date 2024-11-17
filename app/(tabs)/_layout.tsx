import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useGetImagesQuery } from '../../api/pixabayApi';
import BookmarkButton from '../../components/ui/BookmarkButton';

const Home = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<any[]>([]); 
  const [query, setQuery] = useState('nature');
  const [searchTerm, setSearchTerm] = useState(''); 

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

  const handleSearch = () => {
    if (searchTerm.trim().length > 0) {
      setQuery(searchTerm.trim());
      setPage(1); 
      setImages([]); 
    }
  };

const renderItem = ({ item }: { item: any }) => {
  console.log('Rendering item:', item); 
  return (
    <View className="p-4 border-b border-gray-200">
      <Image
        source={{uri:item.webformatURL}}
        style={{width: 400, height: 400}}
        resizeMode="cover"
        onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)} 
      />
      <Text className="text-lg font-bold mt-2">vv: {item.user}</Text>
      <Text className="text-gray-600">Tags: {item.tags}</Text>
      <BookmarkButton imageId={item.id.toString()} />
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
    <View className="flex-1 bg-white">
      {/* Sticky Pencarian */}
      <View className="sticky top-0 bg-white shadow-md p-4 z-10">
        <TextInput
          placeholder="Cari gambar..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
          className="border border-gray-300 rounded-lg p-3"
        />
      </View>

       {/* Infinite Scroll  */}
      {isLoading && page === 1 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500">Error ketika memproses gambar. Tolong coba kembali.</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
};


export default Home;
