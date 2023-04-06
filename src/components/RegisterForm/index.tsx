import { useState } from 'react';
import { z } from 'zod';
import { Form, InputField, SelectField } from '../Form';
import { api } from '~/utils/api';

const schema = z
  .object({
    name: z.string().min(1, 'Required'),
    domain: z.string().min(1, 'Required'),
    // avatar: z.string().optional(), //TODO:
  })
  .or(
    z.object({
      teamId: z.string().min(1, 'Required'),
    })
  );

type RegisterValues = {
  name: string;
  domain: string;
  // avatar?: string;
  teamId: string;
};

const Toogle = ({ onClick }: { onClick: () => void }) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" onClick={onClick} className="peer sr-only" />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Join Team
      </span>
    </label>
  );
};

export const RegisterForm = () => {
  const [chooseTeam, setChooseTeam] = useState(false);

  const { data: teams } = api.team.getAll.useQuery();
  const { mutate: createTeam } = api.team.create.useMutation();
  const { mutate: joinTeam } = api.user.joinTeam.useMutation();

  const onSubmit = (data: RegisterValues) => {
    if (data.hasOwnProperty('teamId')) {
      joinTeam(data);
      return;
    }
    createTeam({ ...data, avatar: '' });
  };

  return (
    <Form<RegisterValues, typeof schema>
      onSubmit={(values: RegisterValues) => {
        onSubmit(values);
      }}
      schema={schema}
      className="rounded bg-green-200 p-4 text-xl"
    >
      {({ register, formState }) => (
        <>
          <Toogle onClick={() => setChooseTeam((toggle) => !toggle)} />
          {chooseTeam && teams?.length !== 0 && !!teams ? (
            <SelectField
              className="w-full p-1"
              label="Choose Team"
              error={formState.errors['teamId']}
              registration={register('teamId')}
              options={teams?.map((team) => ({
                label: team.name,
                value: team.id,
              }))}
            />
          ) : (
            <>
              <InputField
                type="text"
                label="Team Name"
                error={formState.errors['name']}
                registration={register('name')}
              />
              <InputField
                type="text"
                label="Domain"
                error={formState.errors['domain']}
                registration={register('domain')}
              />
              {/* <InputField
                  type="text"
                  label="Avatar"
                  error={formState.errors['avatar']}
                  registration={register('avatar')}
                /> */}
            </>
          )}
          <button type="submit" className="w-full bg-green-400">
            Register
          </button>
        </>
      )}
    </Form>
  );
};
