import ContactListItem from '@/components/ContactListItem.tsx';
import { Contact } from '@/models/Contact.ts';
import { INDEXS } from '@/utils/string-utils.ts';

type Props = {
  data: Map<string, Contact[]>;
};

export default function ContactList({ data }: Props) {
  return (
    <div className="w-full pb-6">
      {INDEXS.map((letter) => {
        if (data.has(letter)) {
          return (
            <div key={letter} className="w-full">
              <h3 className="w-full px-4 py-1.5 font-semibold bg-gray-100">
                {letter}
              </h3>
              {data
                .get(letter)
                ?.map((contact, i) => (
                  <ContactListItem key={i} contact={contact} />
                ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
