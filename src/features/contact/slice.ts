import { getItem, setItem } from '@/utils/storage-utils.ts';
import { createSlice } from '@reduxjs/toolkit';

type FavouritePhoneNumbers = Record<string, boolean>;

type ContactState = {
  favouritePhoneNumbers: FavouritePhoneNumbers;
};

const FAVOURITE_PHONE_NUMBERS_STORAGE_KEY = 'favouritePhoneNumbers';

const getFavouritePhoneNumbers = () =>
  getItem(FAVOURITE_PHONE_NUMBERS_STORAGE_KEY) || {};

const setFavouritePhoneNumbers = (
  favouritePhoneNumbers: FavouritePhoneNumbers,
) => {
  setItem(FAVOURITE_PHONE_NUMBERS_STORAGE_KEY, favouritePhoneNumbers);
};

const initialState: ContactState = {
  favouritePhoneNumbers: getFavouritePhoneNumbers(),
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addFavouritePhoneNumber: (state, action) => {
      state.favouritePhoneNumbers[action.payload] = true;
      setFavouritePhoneNumbers(state.favouritePhoneNumbers);
    },
    removeFavouritePhoneNumber: (state, action) => {
      delete state.favouritePhoneNumbers[action.payload];
      setFavouritePhoneNumbers(state.favouritePhoneNumbers);
    },
  },
});

export default contactSlice.reducer;
export const { addFavouritePhoneNumber, removeFavouritePhoneNumber } =
  contactSlice.actions;
