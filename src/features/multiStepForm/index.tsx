import { useFunnel } from '@/src/features/multiStepForm/lib/useFunnel';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

type ValidateType = (value: string) => Promise<string> | string;

interface RegisterOptions {
  validate?: ValidateType;
}

interface Errors {
  message?: string;
}

type ValidatorList = Array<{
  key: string;
  validate: ValidateType;
}>;

const useForm = <T extends Record<string, string>>(defaultValue: T) => {
  const [formState, setFormState] = useState<T>(defaultValue);
  const [errors, setErrors] = useState<Map<keyof T, Errors>>(new Map());
  const validatorMap = useRef(new Map<keyof T, ValidatorList>(Object.keys(defaultValue).map(key => [key, []]))).current;

  const setValidateList = (key: keyof T, validate?: ValidateType) => {
    const validators: ValidatorList = [];

    if (validate) {
      validators.push({ key: 'validate', validate: validate });
    }

    validatorMap.set(key, validators);
  };

  const validateField = async (key: keyof T, value: string) => {
    const validators = validatorMap.get(key)!;
    let message = '';

    for (const { validate } of validators) {
      const result = await validate(value);
      if (result) {
        message = result;
        break;
      }
    }

    setErrors(prevState => {
      const newErrors = new Map(prevState);
      if (message) {
        newErrors.set(key, { message });
      } else {
        newErrors.delete(key);
      }
      return newErrors;
    });
  };

  const register = (key: keyof T, options?: RegisterOptions) => {
    //1.순위 schema

    // 2.순위
    if (options?.validate) {
      setValidateList(key, options.validate);
    }

    const onChange = async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.currentTarget.value;
      setFormState(prevState => ({ ...prevState, [key]: newValue }));
      await validateField(key, newValue);
    };

    return {
      onChange,
      value: formState[key],
    };
  };

  const handleSubmit =
    (onSubmit: (formState: T) => Promise<void> | void, onError?: (formState: T) => Promise<void> | void) =>
    async (event: FormEvent) => {
      event.preventDefault();

      const validationPromises = Object.entries(formState).map(([key, value]) => {
        validateField(key as keyof T, value);
      });

      await Promise.all(validationPromises);

      const isAllValid = errors.values().every(error => !error);

      if (isAllValid) {
        await onSubmit(formState);
      } else {
        await onError?.(formState);
      }
    };

  return {
    formStates: {
      values: formState,
      errors: Object.fromEntries(errors),
    },
    register,
    handleSubmit,
  };
};

type MultiStepFormTypes = 'info' | 'profile' | 'confirm';

const Steps: MultiStepFormTypes[] = ['info', 'profile', 'confirm'];

const MultiStepForm = () => {
  const { Funnel } = useFunnel(Steps, 'info');
  const { register, handleSubmit, formStates } = useForm({
    firstName: '',
    lastName: '',
  });

  const onSubmit = handleSubmit(
    formState => {
      console.log('Form Submitted', formState);
    },
    formState => {
      console.log('Form Errors', formState);
    }
  );

  return (
    <>
      <Funnel>
        <Funnel.Step name="info">
          <div>
            <input
              className={
                'border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              }
              type={'text'}
              {...register('firstName', {
                validate: (value: string) => {
                  if (value.length < 2) {
                    return 'First name must be at least 2 characters';
                  }
                  return '';
                },
              })}
            />
            {formStates.errors.firstName && (
              <p className={'text-red-500 text-sm mt-1'}>{formStates.errors.firstName.message}</p>
            )}
            <button onClick={onSubmit}>Next</button>
          </div>
        </Funnel.Step>
        <Funnel.Step name="profile">
          <ProfileStep />
        </Funnel.Step>
        <Funnel.Step name="confirm">
          <ConfirmStep />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default MultiStepForm;

const InfoStep = () => {
  console.log('Info Step');
  return <div>Info Step</div>;
};

const ProfileStep = () => {
  console.log('Profile Step');
  return <div>Profile Step</div>;
};

const ConfirmStep = () => {
  console.log('Confirm Step');
  return <div>Confirm Step</div>;
};
