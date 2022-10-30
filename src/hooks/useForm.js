import { useState, useCallback, useEffect } from "react";

const useForm = (initialValues) => {
  const initialErrors = { ...initialValues };

  for (const fieldError in initialErrors) {
    initialErrors[fieldError] = false;
  }

  const [values, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState(initialErrors);
  const [event, setEvent] = useState(null);
  const validateForm = useCallback(
    (event, checkForMatch = false) => {
      if (checkForMatch) {
        const confirmFieldName =
          event.target.name.charAt(0).toUpperCase() +
          event.target.name.slice(1);
        setFieldErrors((prevState) => ({
          ...prevState,
          [event.target.name]: values[event.target.name].validate(
            event.target.value
          ),
          [`confirm${confirmFieldName}`]:
            values[`confirm${confirmFieldName}`]?.validate(
              event.target.value
            ) ||
            event.target.value !== values[`confirm${confirmFieldName}`]?.value,
        }));
      } else {
        setFieldErrors((prevState) => ({
          ...prevState,
          [event.target.name]: values[event.target.name].validate(
            event.target.value
          ),
        }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...Object.values(values)]
  );

  useEffect(() => {
    if (event) {
      validateForm(event, true);
    }
  }, [values, event, validateForm]);

  const handleInputChange = (event) => {
    if (event.target.type === "radio" || event.target.type === "checkbox") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.checked,
          validate: prevValues[event.target.name].validate,
        },
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: {
          value: event.target.value,
          validate: prevValues[event.target.name].validate,
        },
      }));
    }
    setEvent(event);
  };

  const handleInputBlur = (event) => {
    validateForm(event);
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setFieldErrors(initialErrors);
  };

  const validateFormFunction = () => {
    const errors = [];
    for (const fieldName in values) {
      const fieldError = values[fieldName].validate(values[fieldName].value);
      setFieldErrors((prevValues) => ({
        ...prevValues,
        [fieldName]: fieldError,
      }));
      errors.push(fieldError);
    }
    return !errors.some((error) => error);
  };

  const resetValues = () => {
    setFormValues(initialValues);
  };

  const resetErrors = () => {
    setFieldErrors(initialErrors);
  };

  const formValues = {};

  for (const field in values) {
    formValues[field] = values[field].value;
  }

  return [
    formValues,
    fieldErrors,
    handleInputChange,
    handleInputBlur,
    validateFormFunction,
    resetForm,
    resetValues,
    resetErrors,
  ];
};

export default useForm;
