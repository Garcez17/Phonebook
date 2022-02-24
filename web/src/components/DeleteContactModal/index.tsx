import { useRouter } from 'next/router';
import { FiTrash } from 'react-icons/fi';
import Modal from 'react-modal';
import { useMutation } from 'react-query';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type DeleteContactModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  contactId: string;
  isHome?: boolean;
}

export function DeleteContactModal({
  isOpen,
  onRequestClose,
  contactId,
  isHome = true,
}: DeleteContactModalProps) {
  const router = useRouter();

  const deleteContact = useMutation(async () => {
    await api.delete(`/contacts/${contactId}`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('contacts');
    }
  })

  async function handleDeleteContact() {
    await deleteContact.mutateAsync();

    if (router.asPath !== '/') router.push('/');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="flex flex-col items-center justify-center gap-8 p-4 bg-gray-900 rounded w-96 h-96">
        <h2 className="text-2xl">Deseja excluir esse contato?</h2>
        <FiTrash className="w-32 h-32 text-gray-500" />
        <div className="flex items-center justify-center w-full gap-4 px-6">
          <button
            className="flex-1 py-4 duration-100 bg-red-500 rounded hover:bg-red-600"
            onClick={onRequestClose}
          >
            Não
          </button>
          <button
            className="flex-1 py-4 duration-100 bg-blue-500 rounded hover:bg-blue-600"
            onClick={handleDeleteContact}
          >
            Sim
          </button>
        </div>
      </div>
    </Modal>
  )
}