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
  isCompulsory,
  isOnClick,
  isMaxLength,
  isAccept,
  registerInput,
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
        placeholder={inputPlaceholder}
        onClick={(event) => {
          if (isOnClick) {
            event.target.showPicker();
          }
        }}
        maxLength={isMaxLength && isMaxLength}
        accept={isAccept ? isAccept : ""}
        {...registerInput(inputName)}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
