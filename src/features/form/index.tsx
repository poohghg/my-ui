import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';

type Errors<T> = Record<
  keyof T,
  {
    message: string;
  } | null
>;

interface RegisterOptions {
  validate?: (value: string) => string | Promise<string>;
}

interface UseFormProps<T extends Record<string, string>> {
  defaultValues: T;
  schema?: Partial<Record<keyof T, (value: string) => string>>;
}

const useForm = <T extends Record<string, string>>({ defaultValues, schema = {} }: UseFormProps<T>) => {
  const errors = useRef<Errors<T>>({} as Errors<T>).current;

  const [formState, setFormState] = useState<T>(defaultValues);

  const register = useCallback(
    (key: keyof T, options?: RegisterOptions) => {
      const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (options?.validate) {
          const message = await options.validate(value);
          if (message) {
            errors[key] = { message };
          } else {
            errors[key] = null;
          }
        }

        setFormState(prevState => ({ ...prevState, [key]: value }));
      };

      return {
        onChange,
        value: formState[key],
      };
    },
    [formState, errors, schema]
  );

  const formStates = {
    value: { ...formState },
    error: errors,
  };

  const handleSubmit =
    (onSubmit: (formState: T) => Promise<void>, onError?: (formState: T) => Promise<void>) => async (e: FormEvent) => {
      e.preventDefault();
      const isAllValid = Object.values(errors).every(v => v === null);

      if (isAllValid) {
        await onSubmit(formState);
      } else {
        if (onError) {
          await onError(formState);
        }
      }
    };

  return {
    register,
    formStates,
    handleSubmit,
  };
};

// const schema = {
//   name: (value: string) => /^[A-Za-z\s]{4,}$/.test(value),
//   email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
//   employeeId: (value: string) => /^\d{6}$/.test(value),
//   joiningDate: (value: string) => {
//     console.log(new Date(value), new Date());
//     return new Date(value) <= new Date();
//   },
//   test: (value: string) => value.length > 0,
// };

function EmployeeValidationForm() {
  const {
    register,
    formStates: { error },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      employeeId: '',
      joiningDate: '',
    },
    // schema,
  });

  const onSubmit = handleSubmit(async formState => {
    console.log('Form submitted successfully:', formState);
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true);
      }, 1000)
    );
  });

  return (
    <div className="layout-column align-items-center mt-20 ">
      <div className="layout-column align-items-start mb-10 w-50" data-testid="input-name">
        <input
          className="w-100"
          type="text"
          name="name"
          placeholder="Name"
          data-testid="input-name-test"
          {...register('name', {
            validate: async (value: string) =>
              await new Promise<string>(resolve => {
                setTimeout(() => {
                  if (/^[A-Za-z\s]{4,}$/.test(value)) {
                    resolve('');
                  } else {
                    resolve('Name must be at least 4 characters long and only contain letters and spaces');
                  }
                }, 0);
              }),
          })}
        />
        {error.name && <p className="error mt-2">{error.name.message}</p>}
      </div>
      {/*<div className="layout-column align-items-start mb-10 w-50" data-testid="input-email">*/}
      {/*  <input className="w-100" type="text" name="email" placeholder="Email" {...register('email')} />*/}
      {/*  {error.email && <p className="error mt-2">Email must be a valid email address</p>}*/}
      {/*</div>*/}
      {/*<div className="layout-column align-items-start mb-10 w-50" data-testid="input-employee-id">*/}
      {/*  <input*/}
      {/*    className="w-100"*/}
      {/*    type={'number'}*/}
      {/*    name="employeeId"*/}
      {/*    placeholder="Employee ID"*/}
      {/*    onChange={e => {*/}
      {/*      console.log(typeof e.target.value);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  {error.employeeId && <p className="error mt-2">Employee ID must be exactly 6 digits</p>}*/}
      {/*</div>*/}
      {/*<div className="layout-column align-items-start mb-10 w-50" data-testid="input-joining-date">*/}
      {/*  <input*/}
      {/*    className="w-100"*/}
      {/*    type="date"*/}
      {/*    name="joiningDate"*/}
      {/*    placeholder="Joining Date"*/}
      {/*    {...register('joiningDate')}*/}
      {/*  />*/}
      {/*  {error.joiningDate && <p className="error mt-2">Joining Date cannot be in the future</p>}*/}
      {/*</div>*/}
      <button data-testid="submit-btn" type="submit" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

export default EmployeeValidationForm;
