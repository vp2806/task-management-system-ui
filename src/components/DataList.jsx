export default function DataList({ datalistId, datalistOptions }) {
  function getOptions() {
    const options = datalistOptions.map((option, index) => {
      return (
        <option value={option.value} key={index}>
          {option.value}
        </option>
      );
    });
    return options;
  }

  return <datalist id={datalistId}>{getOptions()}</datalist>;
}
