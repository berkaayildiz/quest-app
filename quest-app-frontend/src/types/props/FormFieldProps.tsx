export type FormFieldProps = {
    id: string;
    label: string;
    placeholder: string;
    maxLength: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
