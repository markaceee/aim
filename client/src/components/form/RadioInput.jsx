const RadioInput = ({
  className,
  id,
  name,
  value,
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-1">
      <input
        className={className}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default RadioInput;
