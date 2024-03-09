import ContactList from '@/components/ContactList.tsx';
import Loading from '@/components/Loading.tsx';
import { useListContactsQuery } from '@/features/contact/api.ts';
import { Contact } from '@/models/Contact.ts';
import {
  ALPHABET,
  groupName,
  SPECIAL_KEY,
  toNonAccentVietnamese,
} from '@/utils/string-utils.ts';
import { Icon } from '@iconify/react';
import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ContactMap = Map<string, Contact[]>;

export default function ContactPage() {
  const { t } = useTranslation();
  const { data: contacts, isLoading } = useListContactsQuery();
  const [search, setSearch] = useState('');
  const [filterKeyword, setFilterKeyword] = useState(search);

  const searchDebounce = useMemo(() => debounce(setFilterKeyword, 300), []);
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchDebounce(e.target.value.trim());
  };
  const onClearSearch = () => {
    setSearch('');
    setFilterKeyword('');
  };

  const filterContact = useCallback((contacts: Contact[], keyword: string) => {
    const contactsMap: ContactMap = new Map();
    contacts.forEach((contact) => {
      const lowerKeyword = toNonAccentVietnamese(keyword.toLowerCase());
      const nonAccentFirstName = toNonAccentVietnamese(
        contact.first_name.toLowerCase(),
      );
      const nonAccentLastName = toNonAccentVietnamese(
        contact.last_name.toLowerCase(),
      );
      if (
        !keyword ||
        contact.phoneNumber.includes(lowerKeyword) ||
        groupName(nonAccentLastName, nonAccentFirstName).includes(lowerKeyword)
      ) {
        const firstChar = contact.last_name[0].toUpperCase();
        const indexChar =
          ALPHABET.indexOf(firstChar) === -1 ? SPECIAL_KEY : firstChar;
        if (!contactsMap.has(indexChar)) {
          contactsMap.set(indexChar, []);
        }
        contactsMap.get(indexChar)?.push(contact);
      }
    });
    return contactsMap;
  }, []);

  const filteredContacts = useMemo(() => {
    if (!contacts) return new Map();
    return filterContact(contacts, filterKeyword);
  }, [contacts, filterKeyword, filterContact]);

  return (
    <div className="min-h-dvh w-full pt-[70px]">
      <nav className="w-full bg-primary h-[70px] flex items-center px-4 fixed left-0 top-0">
        <div className="w-full max-w-xl mx-auto flex">
          <div className="h-10 flex-1 relative">
            <div className="flex items-center h-full absolute left-4 top-0">
              <Icon icon="carbon:search" className="text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder={t('messages.search_contact_placeholder')}
              className="rounded-full h-full w-full px-10 outline-0 bg-white"
              disabled={isLoading}
            />
            {search && (
              <div className="flex items-center h-full absolute right-4 top-0">
                <button type="button" onClick={onClearSearch}>
                  <Icon icon="pajamas:clear" className="text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="w-full flex-1">
        <div className="w-full max-w-xl mx-auto">
          {isLoading && (
            <div className="w-full flex items-center justify-center py-16">
              <Loading />
            </div>
          )}
          {!isLoading && <ContactList data={filteredContacts} />}
        </div>
      </main>
    </div>
  );
}
