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

    if (!isHome) router.push('/');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <div className="flex flex-col gap-8 bg-gray-900 p-4 w-96 h-96 rounded items-center justify-center">
        <h2 className="text-2xl">Deseja excluir esse contato?</h2>
        <FiTrash className="w-32 h-32 text-gray-500" />
        <div className="flex gap-4 items-center justify-center w-full px-6">
          <button
            className="bg-red-500 py-4 rounded flex-1 duration-100 hover:bg-red-600"
            onClick={onRequestClose}
          >
            Não
          </button>
          <button
            className="bg-blue-500 py-4 rounded flex-1 duration-100 hover:bg-blue-600"
            onClick={handleDeleteContact}
          >
            Sim
          </button>
        </div>
      </div>
    </Modal>
  )
}