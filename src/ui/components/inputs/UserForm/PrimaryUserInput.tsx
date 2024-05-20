import React from 'react'

interface PrimaryUserInputProps {
    labelContent: string
    inputType: string
    placeholder: string
    value: string
    autoFocus?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PrimaryUserInput = ({
    labelContent,
    inputType,
    placeholder,
    value,
    autoFocus = false,
    onChange,
}: PrimaryUserInputProps) => {
    return (
        <div className="flex flex-col w-full">
            <label
                className="block text-gray-700 text-md font-bold mb-2 ml-1"
                htmlFor={labelContent}
            >
                {labelContent}
            </label>
            <input
                type={inputType}
                id={labelContent}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-primary-app-color"
                placeholder={placeholder}
                required
                autoFocus={autoFocus}
            />
        </div>
    )
}

export default PrimaryUserInput
