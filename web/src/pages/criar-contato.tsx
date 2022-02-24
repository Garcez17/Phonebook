import { useRouter } from "next/router"
import { FiChevronLeft } from "react-icons/fi";
import { ContactForm } from "../components/ContactForm";

export default function CreateContact() {
  const router = useRouter();

  return (
    <div className="p-4">
      <button
        className="flex items-center justify-center w-8 h-8 duration-100 rounded-full hover:bg-gray-800"
        type="button"
        onClick={() => router.back()}
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <ContactForm />
    </div>
  )
}