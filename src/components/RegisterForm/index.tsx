import { useState } from 'react';
import { z } from 'zod';
import { Form, InputField, SelectField } from '../Form';

const schema = z
  .object({
    teamName: z.string().min(1, 'Required'),
    domain: z.string().min(1, 'Required'),
    // avatar: z.string().optional(), //TODO:
  })
  .or(
    z.object({
      teamId: z.string().min(1, 'Required'),
    })
  );

type RegisterValues = {
  teamName: string;
  domain: string;
  // avatar?: string;
  teamId: string;
};

const team = [{ name: 'test', id: '4234234f' }];

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

  const onSubmit = (data: RegisterValues) => {
    console.log(data);
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
          {chooseTeam && team.length > 0 ? (
            <SelectField
              className="w-full p-1"
              label="Choose Team"
              error={formState.errors['teamId']}
              registration={register('teamId')}
              options={team.map((team) => ({
                label: team.name,
                value: team.id,
              }))}
            />
          ) : (
            <>
              <InputField
                type="text"
                label="Team Name"
                error={formState.errors['teamName']}
                registration={register('teamName')}
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
