interface IProps {
    name: string,
    label: string,
    rows?: number,
    placeholder?: string,
    disabled?: boolean,
    defaultValue?: string
}

export const FormText: React.FC<IProps> = ({name, label, placeholder, disabled = false, defaultValue = "", rows = 3}) => {
  return (
    <div key={name} className="mb-3">
    <label
      className="block mb-1 text-md min-w-[350px] font-medium text-gray-900"
      htmlFor={name}
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      defaultValue={defaultValue}
      disabled={disabled}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      placeholder={placeholder ? placeholder : ""}
    ></textarea>
  </div>
  )
}
