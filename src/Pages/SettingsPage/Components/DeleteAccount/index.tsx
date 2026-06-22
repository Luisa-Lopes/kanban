import { Button, Modal } from "@/Layout";
import { useState } from "react";

export interface IUserDeleteAccount {
  confirmationRequired: boolean;
  warningMessage: string;
}

interface IDeleteAccountSection {
  account: IUserDeleteAccount;
}

const DeleteAccountSection = ({ account }: IDeleteAccountSection) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAccount = () => {
    console.log("Excluir conta");
  };

  return (
    <>
      <div className="space-y-4 rounded-lg border border-red-200 bg-red-50 p-6">
        <div>
          <h3 className="text-xl font-semibold text-red-600">Excluir Conta</h3>

          <p className="mt-2 text-sm text-gray-600">
            A exclusão da conta é permanente. Todos os seus dados,
            configurações, projetos e histórico serão removidos e não poderão
            ser recuperados.
          </p>
        </div>

        <div className="rounded-md border border-red-200 bg-white p-4">
          <h4 className="font-medium text-red-600">O que será removido?</h4>

          <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
            <li>Informações do perfil</li>
            <li>Configurações da conta</li>
            <li>Histórico de atividades</li>
            <li>Projetos pessoais vinculados à conta</li>
            <li>Preferências de notificações</li>
          </ul>
        </div>

        <Button
          variant="danger"
          className="w-fit rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Excluir Conta
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600">
              Confirmar Exclusão
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Tem certeza que deseja excluir sua conta?
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Esta ação não poderá ser desfeita.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>

            <Button variant="danger" onClick={handleDeleteAccount}>
              Excluir Conta
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default DeleteAccountSection;
