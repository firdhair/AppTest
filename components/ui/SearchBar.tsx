import React from 'react';
import { View, TextInput } from 'react-native';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <View className="sticky top-0 text-slate-700 bg-white shadow-md p-4 z-10">
      <TextInput
        placeholder="Cari gambar..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={handleSearch}
        className="font-minimo border-b border-lime-100 text-slate-700 rounded-lg p-3 w-full"
      />
    </View>
  );
};

export default SearchBar;
