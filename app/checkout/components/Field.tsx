export interface FormError {
    for: string;
    message: string;
}

interface FieldProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    formErrors: FormError[] | undefined,
    setFormErrors: React.Dispatch<React.SetStateAction<FormError[] | undefined>>;
}

export const Field: React.FC<FieldProps> = ({ name, placeholder, value, onChange, formErrors, setFormErrors }) => {
    const isError = formErrors?.find(error => error.for === name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        if (isError) {
            setFormErrors(formErrors?.filter(e => e.for !== name));
        }
    };

    return (
        <div className="flex flex-col w-full gap-1">
            <label
                className={`flex flex-col justify-center w-full text-[12px] pl-3 ${value ? 'py-2' : 'py-4'} rounded-[2px] border-[1px] border-[#a4a4a4] focus:border-[2px] ${value && !isError ? 'border-white' : ''} ${isError ? 'border-red-500' : ''}  text-[#a4a4a4]`}
            >
                {value && placeholder}
                <div className="flex flex-row gap-2">
                    {name === "phone" && <p>+91</p>}
                    <input
                        placeholder={placeholder}
                        className="w-full bg-transparent outline-none placeholder:font-ibm placeholder:text-sm placeholder:text-[16px] placeholder:text-[a4a4a4]  text-accent"
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            </label>
            <p className="text-red-500 text-[12px]">{isError?.message}</p>
        </div>
    );
};
