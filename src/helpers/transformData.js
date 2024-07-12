export function transformData(
  originalData,
  columnMapping,
  actionElements,
  limitOfData
) {
  return new Promise((resolve, reject) => {
    try {
      let columns = [];
      let transformedData = [];
      let filteredData = [];

      if (originalData?.length > 0) {
        //Filter the column from products data
        columns = Object.keys(originalData[0]);
        if (actionElements) {
          columns.push("Actions");
        }

        originalData?.forEach((data) => {
          let newData = {};
          columns.map((column) => {
            if (data[column]) {
              newData = { ...newData, [column]: data[column] };
            } else if (data[column] === null) {
              newData = { ...newData, [column]: "-" };
            } else if (actionElements) {
              newData = {
                ...newData,
                [column]: actionElements(newData),
              };
            }
            return column;
          });
          transformedData.push(newData);
        });

        //Mapping the colun name
        columns = columns.map((column) => {
          if (columnMapping[column]) {
            return columnMapping[column];
          }
        });
      }

      filteredData = transformedData?.slice(
        limitOfData.lowerLimitOfData,
        limitOfData.upperLimitOfData
      );

      return resolve({ columns, filteredData });
    } catch (error) {
      return reject({ columns: null, filteredData: null });
    }
  });
}
