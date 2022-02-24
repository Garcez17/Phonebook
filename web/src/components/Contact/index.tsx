import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { getContact } from "../../services/hooks/useContact";
import { Contact } from "../../services/hooks/useContacts";
import { queryClient } from "../../services/queryClient";

import { DeleteContactModal } from "../DeleteContactModal";

type ContactProps = {
  contact: Contact;
}

export function Contact({ contact }: ContactProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function handlePrefetchContact(contact_id: string) {
    await queryClient.prefetchQuery(
      ['contacts', contact_id],
      () => getContact(contact_id),
      {
        staleTime: 1000 * 60 * 10,
      },
    );
  }

  return (
    <div className="flex items-center h-20 px-4 duration-100 hover:bg-gray-800" onMouseEnter={() => handlePrefetchContact(contact.id)}>
      <DeleteContactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contactId={contact.id} />
      <Link href={`/contatos/${contact.id}`}>
        <a className="flex flex-1">
          <div className="flex flex-1 items-center">
            <div className="w-16 h-16 relative">
              <Image className="rounded-xl" src={contact.avatar_url} alt={contact.name} layout="fill" />
            </div>
            <div className="flex flex-col justify-center h-20 px-4">
              <h2 className="font-bold">{contact.name}</h2>
              <span className="text-sm font-bold text-gray-500">{contact.phone_number}</span>
            </div>
          </div>
        </a>
      </Link>

      <div className="flex items-center gap-4">
        <Link href={`/editar-contato/${contact.id}`}>
          <a className="p-2 font-bold bg-blue-500 rounded">
            <FiEdit3 />
          </a>
        </Link>
        <button className="p-2 font-bold bg-red-500 rounded" onClick={() => setModalIsOpen(true)}>
          <FiTrash />
        </button>
      </div>
    </div>
  )
}