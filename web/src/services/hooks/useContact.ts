import { useQuery } from "react-query";

import { Contact } from "./useContacts";
import { api } from "../api";

type GetContactsResponse = {
  contact: Contact;
}

export async function getContact(contact_id: string): Promise<GetContactsResponse> {
  const { data: contact } = await api.get<Contact>(`/contacts/${contact_id}`);

  return {
    contact,
  }
}

export function useContact(contact_id: string) {
  return useQuery(['contacts', contact_id], () => getContact(contact_id), {
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}