import { GetServerSideProps } from "next";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronLeft, FiEdit3, FiTrash } from "react-icons/fi";
import { DeleteContactModal } from "../../components/DeleteContactModal";
import { useContact } from "../../services/hooks/useContact";

type ContactProps = {
  id: string;
}

export default function Contact({ id }: ContactProps) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data, isLoading } = useContact(id);

  return (
    <div className="flex flex-col flex-1">
      {isLoading || !data ? (
        <div className="flex items-center justify-center flex-1">
          <svg className="w-5 h-5 mr-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
      ) : (
        <>
          <DeleteContactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} contactId={data.contact.id} />

          <header className="flex flex-col items-center justify-center gap-4 p-4 h-60">
            <button
              className="flex items-center self-start justify-center w-8 h-8 duration-100 rounded-full hover:bg-gray-800"
              type="button"
              onClick={() => router.back()}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>

            <Image className="rounded-3xl" src={data.contact.avatar_url} width={150} height={110} alt={data.contact.name} />
            <h1 className="text-2xl text-bold">{data.contact.name}</h1>
          </header>
          <section className="flex flex-col flex-1 px-6 bg-gray-800 divide-y divide-gray-900 rounded-t-3xl">
            <div className="flex flex-col gap-2 py-6">
              <span className="text-gray-500">Telefone</span>
              <p>{data.contact.phone_number}</p>
            </div>
            <div className="flex flex-col gap-2 py-6">
              <span className="text-gray-500">Email</span>
              <p>{data.contact.email}</p>
            </div>

            <div className="flex items-center justify-center flex-1 w-full gap-4 px-6">
              <Link href={`/editar-contato/${data.contact.id}`}>
                <a className="flex items-center justify-center flex-1 w-32 h-32 duration-100 bg-blue-500 rounded hover:bg-blue-600">
                  <FiEdit3 className="w-10 h-10" />
                </a>
              </Link>
              <button
                className="flex items-center justify-center flex-1 w-32 h-32 duration-100 bg-red-500 rounded hover:bg-red-600"
                onClick={() => setModalIsOpen(true)}
              >
                <FiTrash className="w-10 h-10" />
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const id = req.params!.id;

  return {
    props: {
      id,
    },
  }
}