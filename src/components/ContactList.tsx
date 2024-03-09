import { Contact } from '@/models/Contact.ts';
import { INDEXS } from '@/utils/string-utils.ts';
import ContactListSection from '@/components/ContactListSection.tsx';

type Props = {
  data: Map<string, Contact[]>;
};

export default function ContactList({ data }: Props) {
  return (
    <div className="w-full pb-6">
      {INDEXS.map((letter) => {
        if (data.has(letter)) {
          return (
            <ContactListSection
              key={letter}
              letter={letter}
              contacts={data.get(letter)!}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
