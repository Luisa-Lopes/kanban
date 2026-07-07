import { useFormik } from "formik";
import { Button, Input } from "../../../../Layout";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IProjectModal {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const ProjectDetails = ({ isModalOpen, setIsModalOpen }: IProjectModal) => {
  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      endDate: "",
      startDate: "",
      mate: "",
      team: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="flex  flex-col h-3/4 w-2/3">
      <div className="flex flex-col items-center justify-center">
        <h1>Criar Novo Projeto</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 w-full h-full p-5"
        >
          <Input
            label="Nome do projeto"
            type="text"
            placeholder="Digite o nome do projeto"
            variant="default"
            required
            error={formik.errors.projectName}
            value={formik.values.projectName}
            onChange={formik.handleChange}
            name="projectName"
          />
          <Input
            label="Descrição"
            type="text"
            placeholder="Descrição do projeto"
            variant="default"
            size="md"
            required
            error={formik.errors.description}
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          />

          <section className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Input
                label=""
                type="text"
                placeholder="Equipe"
                variant="default"
                size="md"
                error={formik.errors.mate}
                value={formik.values.mate}
                onChange={formik.handleChange}
                name="mate"
              />

              <Button
                onClick={() => {
                  if (!formik.values.mate.trim()) return;

                  formik.setFieldValue("team", [
                    ...formik.values.team,
                    formik.values.mate,
                  ]);

                  formik.setFieldValue("mate", "");
                }}
              >
                Adicionar
              </Button>
            </div>

            <section
              style={{
                height: 100,
              }}
            >
              <div className="h-full overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  {formik.values.team.map((member) => (
                    <span
                      key={member}
                      className="rounded-md bg-blue-100 px-3 py-1 text-sm text-blue-700 flex gap-3 justify-between items-center"
                      style={{ height: 30 }}
                    >
                      <h6 className="p-0 m-0 w-5/6"> {member}</h6>

                      <button
                        className="p-0 m-0 w-1/6"
                        onClick={() => {
                          formik.setFieldValue("team", [
                            ...formik.values.team.filter((f) => f != member),
                          ]);
                        }}
                      >
                        <XMarkIcon width={24} height={24} className="" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </section>

          <Button className="mt-auto" type="submit">
            Criar Projeto
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ProjectDetails;
