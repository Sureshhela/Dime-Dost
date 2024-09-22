export default interface InputField {
    inputText: string | number;
    setInputText: (value: string | number) => void ;
    setHelperText: (value: string | number | null) => void;
    error: string | null;
    label: string;
    style: object;
    type: string;
    InputProps: {};
}