import { useState } from "react"
export interface FormError {
    formErrors: Array<any>,
    fieldErrors: any
}

/**
 * Hook to handle submit form error massages
 * @returns [errorMsg , translateErrorMsg , resetErrorMsg]
 */
const useFormError = (): [FormError, Function, Function] => {
    const INIT_VALUE: FormError = {
        formErrors: [],
        fieldErrors: {}
    };
    const [errorMsg, setErrorMsg] = useState<FormError>(INIT_VALUE);

    /**
     * translate form errors information to certain format of mesage
     * @param {*} errors 
     */
    const translateErrorMsg: Function = (errors: Array<string>): void => {

        const message: FormError = {
            formErrors: [],
            fieldErrors: {}
        };

        if (errors) {
            errors.forEach(error => {
                const reg = /instance\.[a-zA-Z0-9_]+/g;
                const fieldNames: RegExpMatchArray | null = error.match(reg);

                if (fieldNames) {
                    const name: string = fieldNames[0].split(".")[1];
                    const msg: string = error.replace(reg, name);

                    if (message.fieldErrors[name] === undefined) {
                        message.fieldErrors[name] = [];
                    }

                    message.fieldErrors[name].push(msg);
                } else {
                    message.formErrors.push(error);
                }
            });
        }
        setErrorMsg(message);
    }

    const resetErrorMsg: Function = (): void => {
        setErrorMsg(INIT_VALUE);
    }

    return [errorMsg, translateErrorMsg, resetErrorMsg];
}

export default useFormError;