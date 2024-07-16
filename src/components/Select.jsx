export default function InputSelect({
  labelClassName,
  label,
  selectId,
  selectClassName,
  selectName,
  selectOptions,
  isCheck,
  isCompulsory,
  registerInput,
  error,
}) {
  function getOptions() {
    const options = selectOptions.map((option, index) => {
      return (
        <option value={option.value} key={index}>
          {option.value}
        </option>
      );
    });
    return options;
  }

  return (
    <div>
      <label htmlFor="countries" className={labelClassName}>
        {label} {isCompulsory && <span className="text-red-600">*</span>}
      </label>
      <select
        id={selectId}
        className={selectClassName}
        name={selectName}
        {...registerInput(selectName)}
      >
        <option value="" key="">
          {`Select ${label}`}
        </option>
        {getOptions()}
      </select>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
