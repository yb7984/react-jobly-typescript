import { useState, ChangeEvent, ChangeEventHandler } from "react";

const useFields = (initialValue: any): [any, ChangeEventHandler, Function] => {

    const [formData, setFormData] = useState(initialValue);

    const handleChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: boolean | string = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData((fData: any) => ({
            ...fData,
            [name]: value
        }));
    }

    const resetFormData: Function = () => {
        setFormData(initialValue);
    }

    return [formData, handleChange, resetFormData];
}

export default useFields;