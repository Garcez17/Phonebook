import { useQuery } from "react-query";

import { api } from "../api";

export type Contact = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  phone_number: string;
}

type ApiResponse = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  phone_number: string;
}

type GetContactsResponse = {
  contacts: Contact[];
}

async function getContacts(): Promise<GetContactsResponse> {
  const { data } = await api.get<ApiResponse[]>('/contacts');

  const contacts = data.map(contact => {
    return {
      id: contact.id,
      avatar_url: contact.avatar_url,
      phone_number: contact.phone_number,
      name: contact.name,
      email: contact.email,
    }
  });

  return {
    contacts,
  }
}

export function useContacts() {
  return useQuery(['contacts'], getContacts, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}