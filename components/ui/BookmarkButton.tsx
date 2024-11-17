import React from 'react';
import { Text , TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../../store/slices/bookmarkSlice';
import { RootState } from '../../store';
import { FontAwesome } from '@expo/vector-icons'; 

interface Props {
  imageId: string;
}

const BookmarkButton: React.FC<Props> = ({ imageId }) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector((state: RootState) =>
    state.bookmarks.bookmarks.includes(imageId)
  );

  const toggleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(imageId));
    } else {
      dispatch(addBookmark(imageId));
    }
  };

  return (
  <TouchableOpacity
      onPress={toggleBookmark}
      className={`flex-row items-center justify-center space-x-2 p-1 w-36 rounded-md mx-2 mt-2  
        ${isBookmarked ? 'bg-yellow-400' : 'bg-gray-200'}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
      }}
    >
      <FontAwesome
        name={isBookmarked ? 'heart' : 'heart-o'}
        size={20}
        color={isBookmarked ? '#e53e3e' : '#4a5568'}
        style={{ transform: [{ scale: isBookmarked ? 1.1 : 1 }] }}
      />
      <Text className={`font-minimo text-lg font-semibold ${isBookmarked ? 'font-minimo text-yellow-600' : 'text-gray-700'}`}>
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </Text>
    </TouchableOpacity>
  );
};

export default BookmarkButton;
