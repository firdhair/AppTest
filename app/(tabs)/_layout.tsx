import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { useGetImagesQuery } from '../../api/pixabayApi';
import BookmarkButton from '../../components/ui/BookmarkButton';
import { useFonts } from 'expo-font'; // Use the hook from expo-font

const Home = () => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState<any[]>([]);
  const [query, setQuery] = useState('nature');
  const [searchTerm, setSearchTerm] = useState('');

  const { data, error, isLoading, isFetching } = useGetImagesQuery({
    query,
    page,
  });

  const [fontsLoaded] = useFonts({
    'minimo': require('../../assets/fonts/Minimo.otf'),
    'minimo-bold': require('../../assets/fonts/Minimo Bold.otf'),
  });

  useEffect(() => {
    if (data?.hits?.length) {
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
    return (
      <View className="p-4 border-b border-gray-100 flex flex-row items-center">
        <Image
          source={{ uri: item.webformatURL }}
          className="h-48 w-48 rounded-sm"
          resizeMode="cover"
          onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
        />
       <View className='flex'>
        <Text className="font-minimo text-lime-500 mx-2 font-semibold mt-2 text-lg">Username:</Text>
        <Text className="font-minimoBold text-zinc-700 mx-2 font-semibold">{item.user}</Text>
        <Text className="font-minimo text-zinc-700 mx-2 font-semibold flex-wrap w-full">Tags: {item.tags}</Text>
        <BookmarkButton imageId={item.id.toString()} />
       </View>
        {/* <Text className="text-gray-600">Tags: {item.tags}</Text>
        <BookmarkButton imageId={item.id.toString()} /> */}
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
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500">Error ketika memproses gambar. Tolong coba kembali.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Sticky Pencarian */}
      <View className="sticky top-0 text-slate-700 bg-white shadow-md p-4 z-10">
        <TextInput
          placeholder="Cari gambar..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
          className="font-minimo border-b border-lime-100 text-slate-700 rounded-lg p-3 w-full"
        />
      </View>

      {/* Infinite Scroll */}
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
              <View className="py-4 flex justify-center items-center">
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
