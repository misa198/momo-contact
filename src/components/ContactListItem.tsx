import {
  addFavouritePhoneNumber,
  removeFavouritePhoneNumber,
} from '@/features/contact/slice.ts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx';
import { Contact } from '@/models/Contact.ts';
import { Icon } from '@iconify/react';

type Props = {
  contact: Contact;
};

function FavouriteIcon() {
  return <Icon icon="ph:heart-fill" className="text-xl text-primary" />;
}

function UnFavouriteIcon() {
  return <Icon icon="ph:heart" className="text-xl text-gray-400" />;
}

export default function ContactListItem({ contact }: Props) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    Boolean(state.contact.favouritePhoneNumbers[contact.phoneNumber]),
  );

  const onToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavouritePhoneNumber(contact.phoneNumber));
    } else {
      dispatch(addFavouritePhoneNumber(contact.phoneNumber));
    }
  };

  return (
    <div className="w-full flex px-4 py-2 border-b last:border-b-0 items-center">
      <div className="flex-1">
        <h4 className="font-semibold mb-1">
          {contact.last_name} {contact.first_name}
        </h4>
        <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
      </div>

      <button type="button" onClick={onToggleFavorite}>
        {isFavorite ? <FavouriteIcon /> : <UnFavouriteIcon />}
      </button>
    </div>
  );
}
