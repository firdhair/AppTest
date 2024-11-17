import React from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark } from '../../store/slices/bookmarkSlice';
import { RootState } from '../../store';

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
    <Button
      title={isBookmarked ? 'Hapus Bookmark' : 'Bookmark'}
      onPress={toggleBookmark}
    />
  );
};

export default BookmarkButton;
