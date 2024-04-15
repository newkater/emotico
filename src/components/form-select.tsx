interface IProps {
    name: string,
    label: string,
    options: {key: string, value: string}[]
    selected: string
}

export const FormSelect: React.FC<IProps> = ({ name, label, selected, options}) => {
  return (
    <div key={name} className="mb-3">
    <label
      className="block mb-1 text-md min-w-[350px] font-medium text-gray-900"
      htmlFor={name}
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      defaultValue={selected}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
    >
      <option value={""}>Select Company</option>
      {options.map(o => <option key={o.key} value={o.key}>{o.value}</option>)}
    </select>
  </div>
  )
}
