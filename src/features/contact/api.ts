import { api } from '@/features/api';
import { Contact } from '@/models/Contact';
import instance from '@/plugins/axios.ts';
import { AxiosResponse } from 'axios';

const LIST_CONTACTS_API_URL =
  'https://www.mockachino.com/17acefab-0956-47/contacts';

export type ListContactsApiRes = {
  contacts: Contact[];
};

const listContactsApi = (): Promise<AxiosResponse<ListContactsApiRes>> =>
  instance.get(LIST_CONTACTS_API_URL);

export const contactApi = api.injectEndpoints({
  endpoints: (build) => ({
    listContacts: build.query<Contact[], void>({
      queryFn: async () => {
        const { data } = await listContactsApi();
        return { data: data.contacts };
      },
    }),
  }),
});

export const { useListContactsQuery } = contactApi;
