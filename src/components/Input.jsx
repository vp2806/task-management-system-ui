export default function Input({
  parentClassName,
  inputType,
  className,
  inputId,
  inputName,
  inputValue,
  inputPlaceholder,
  labelClassName,
  label,
  handleChange,
  error,
  maxDate,
  minDate,
  isCompulsory,
  isOnClick,
  isMaxLength,
  isAccept,
  registerInput,
  list,
  isMultiple,
}) {
  return (
    <div className={parentClassName}>
      {label && (
        <label htmlFor={inputId} className={labelClassName}>
          {label} {isCompulsory && <span className="text-red-600">*</span>}
        </label>
      )}

      <input
        type={inputType}
        className={className}
        id={inputId}
        name={inputName}
        onChange={handleChange}
        defaultValue={inputValue && inputValue}
        max={maxDate ? maxDate : ""}
        min={minDate ? minDate : ""}
        placeholder={inputPlaceholder}
        onClick={(event) => {
          if (isOnClick) {
            event.target.showPicker();
          }
        }}
        maxLength={isMaxLength && isMaxLength}
        accept={isAccept ? isAccept : ""}
        {...registerInput(inputName)}
        list={list ? list : ""}
        multiple={isMultiple ? isMultiple : false}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
