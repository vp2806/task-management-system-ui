export default function DataTableComp({ id, className, columns, data }) {
  function getColumns() {
    const productColumn = columns.map((column, index) => {
      return (
        <th key={index} className="px-6 py-3">
          {column}
        </th>
      );
    });
    return productColumn;
  }

  function getData() {
    const product = data.map((data, index) => {
      return (
        <tr key={index} className="border-b  hover:bg-gray-100 text-gray-900">
          {getOneRecord(data)}
        </tr>
      );
    });
    return product;
  }

  function getOneRecord(data) {
    const oneRecord = Object.values(data).map((value, index) => {
      return (
        <td key={index} className="px-6 py-3">
          {value}
        </td>
      );
    });
    return oneRecord;
  }

  return (
    <table id={id} className={className}>
      <thead className="text-sm text-gray-700 bg-gray-50">
        <tr>{getColumns()}</tr>
      </thead>
      <tbody>{getData()}</tbody>
    </table>
  );
}
