import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { FiChevronLeft } from "react-icons/fi";
import { ContactForm } from "../../components/ContactForm";
import { useContact } from "../../services/hooks/useContact";

type EditContactProps = {
  id: string;
}

export default function EditContact({ id }: EditContactProps) {
  const router = useRouter();

  const { data, isLoading } = useContact(id);

  return (
    <div className="p-4">
      <button
        className="flex items-center justify-center w-8 h-8 duration-100 rounded-full hover:bg-gray-800"
        type="button"
        onClick={() => router.back()}
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      {!data || isLoading ? (
        <p>Loading...</p>
      ) : (
        <ContactForm defaultValues={data.contact} />
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const id = req.params!.id;

  return {
    props: {
      id,
    }
  }
}