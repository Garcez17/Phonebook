import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiSearch } from 'react-icons/fi';

import { Contact } from "../components/Contact";
import { ShimmerLoading } from "../components/ShimmerContactListLoading";

import { useContacts } from "../services/hooks/useContacts";

export default function Home() {
  const { data, isLoading } = useContacts();
  const [search, setSearch] = useState<string>('');

  const filteredContacts = data?.contacts.filter(contact => {
    if (contact.name.toLowerCase().includes(search.toLowerCase())) {
      return contact;
    }
  });

  return (
    <>
      <Head>
        <title>Agenda</title>
      </Head>
      <header className="flex items-center justify-between px-4 h-28">

        <h1 className="text-4xl">Agenda</h1>
        <Link href="/criar-contato">
          <a className="p-1 text-2xl duration-100 bg-blue-500 rounded hover:bg-blue-600">
            <FiPlus />
          </a>
        </Link>
      </header>
      <div className="flex items-center justify-center px-4 bg-gray-900 h-14">
        <FiSearch className="w-6 h-6" />
        <input
          className="flex-1 h-full px-4 bg-gray-900 outline-none"
          type="text"
          placeholder="Pesquisar contato"
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <section className="flex flex-col flex-1 overflow-y-auto divide-y divide-gray-900">
        {isLoading || !data || !filteredContacts ? (
          <>
            <ShimmerLoading />
            <ShimmerLoading />
            <ShimmerLoading />
            <ShimmerLoading />
          </>
        ) : (
          filteredContacts.length === 0 ? (
            <div className="flex flex-col flex-1 gap-8 items-center justify-center">
              <FiSearch className="w-20 h-20" />
              <p className="text-center">Nenhum contato encontrado. <br /> Tente novamente</p>
            </div>
          ) : (
            filteredContacts.map(contact => (
              <Contact key={contact.id} contact={contact} />
            ))
          )
        )}
      </section>
    </>
  )
}
