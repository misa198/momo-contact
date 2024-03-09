import { Contact } from '@/models/Contact.ts';
import { useMemo } from 'react';
import ContactListItem from '@/components/ContactListItem.tsx';
import { groupName } from '@/utils/string-utils.ts';

export default function ContactListSection({
  letter,
  contacts,
}: {
  letter: string;
  contacts: Contact[];
}) {
  const sortedContacts = useMemo(
    () =>
      contacts.sort((a, b) =>
        groupName(a.last_name, a.first_name).localeCompare(
          groupName(b.last_name, b.first_name),
        ),
      ),
    [contacts],
  );

  return (
    <div key={letter} className="w-full">
      <h3 className="w-full px-4 py-1.5 font-semibold bg-gray-100">{letter}</h3>
      {sortedContacts.map((contact, i) => (
        <ContactListItem key={i} contact={contact} />
      ))}
    </div>
  );
}
