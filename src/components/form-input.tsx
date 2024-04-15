interface IProps {
  type: string,
  name: string,
  label: string,
  placeholder?: string,
  defaultValue?: string,
  disabled?: boolean
}

export const FormInput: React.FC<IProps> = ({type, name, label, placeholder, defaultValue = "", disabled = false}) => {
  return (
    <div key={name} className="mb-3">
    <label
      className="block mb-1 text-md min-w-[350px] font-medium text-gray-900"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      defaultValue={defaultValue}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
      placeholder={placeholder ? placeholder : ""}
      disabled={disabled}
    />
  </div>
  )
}
