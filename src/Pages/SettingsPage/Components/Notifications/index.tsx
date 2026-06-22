import { Button, Checkbox } from "@/Layout";
import { useFormik } from "formik";

export interface IUserNotifications {
  emailNotifications: {
    taskAssigned: boolean;
    taskUpdated: boolean;
    taskDueSoon: boolean;
    projectInvitation: boolean;
    commentMention: boolean;
    weeklySummary: boolean;
  };

  pushNotifications: {
    taskAssigned: boolean;
    taskUpdated: boolean;
    commentMention: boolean;
  };
}

interface INotification {
  notification: IUserNotifications;
}

const NotificationsSection = ({ notification }: INotification) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      emailNotifications: {
        taskAssigned: notification?.emailNotifications?.taskAssigned ?? "",
        taskUpdated: notification?.emailNotifications?.taskUpdated ?? "",
        taskDueSoon: notification?.emailNotifications?.taskDueSoon ?? "",
        projectInvitation: notification?.emailNotifications?.taskAssigned ?? "",
        commentMention: notification?.emailNotifications?.commentMention ?? "",
        weeklySummary: notification?.emailNotifications?.weeklySummary ?? "",
      },
      pushNotifications: {
        taskAssigned: notification?.pushNotifications?.taskAssigned ?? "",
        taskUpdated: notification?.pushNotifications?.taskUpdated ?? "",
        commentMention: notification?.pushNotifications?.commentMention ?? "",
      },
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Notificações</h3>

      <div className="flex flex-col gap-3">
        <h3>E-mail</h3>
        <Checkbox
          label="Menção em comentários"
          variant="default"
          size="sm"
          error={formik?.errors?.emailNotifications?.commentMention}
          checked={formik?.values?.emailNotifications?.commentMention}
          onChange={formik.handleChange}
          name="emailNotifications.commentMention"
        />
        <Checkbox
          label="Convite para projetos"
          variant="default"
          size="sm"
          error={formik?.errors?.emailNotifications?.projectInvitation}
          checked={formik?.values?.emailNotifications?.projectInvitation}
          onChange={formik.handleChange}
          name="emailNotifications.projectInvitation"
        />
        <Checkbox
          label="Atribuição em tarefas"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.emailNotifications?.taskAssigned}
          checked={formik?.values?.emailNotifications?.taskAssigned}
          onChange={formik.handleChange}
          name="emailNotifications.taskAssigned"
        />
        <Checkbox
          label="Tarefas que irão vencer"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.emailNotifications?.taskDueSoon}
          checked={formik?.values?.emailNotifications?.taskDueSoon}
          onChange={formik.handleChange}
          name="emailNotifications.taskDueSoon"
        />
        <Checkbox
          label="Tarefas atualizadas"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.emailNotifications?.taskUpdated}
          checked={formik?.values?.emailNotifications?.taskUpdated}
          onChange={formik.handleChange}
          name="emailNotifications.taskUpdated"
        />
        <Checkbox
          label="Resumo semanal"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.emailNotifications?.weeklySummary}
          checked={formik?.values?.emailNotifications?.weeklySummary}
          onChange={formik.handleChange}
          name="emailNotifications.weeklySummary"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3>Notificações no Aplicativo</h3>
        <Checkbox
          label="Menção em comentários"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.pushNotifications?.commentMention}
          checked={formik?.values?.pushNotifications?.commentMention}
          onChange={formik.handleChange}
          name="pushNotifications?.commentMention"
        />
        <Checkbox
          label="Atribuição em tarefas"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.pushNotifications?.taskAssigned}
          checked={formik?.values?.pushNotifications?.taskAssigned}
          onChange={formik.handleChange}
          name="pushNotifications?.taskAssigned"
        />
        <Checkbox
          label="Tarefas Atualizadas"
          variant="default"
          size="sm"
          className="flex flex-col"
          error={formik?.errors?.pushNotifications?.taskUpdated}
          checked={formik?.values?.pushNotifications?.taskUpdated}
          onChange={formik.handleChange}
          name="pushNotifications?.taskUpdated"
        />
      </div>

      <div className="flex items-end justify-end">
        <Button
          onClick={() => formik.handleSubmit()}
          className="flex rounded-md"
        >
          Salvar Alterações
        </Button>
      </div>
    </div>
  );
};

export default NotificationsSection;
