export function transformData(
  originalData,
  columnMapping,
  actionElements,
  columnValueMapping
) {
  return new Promise((resolve, reject) => {
    try {
      let columns = [];
      let transformedData = [];

      if (originalData?.length > 0) {
        //Filter the column from  data
        columns = Object.keys(originalData[0]);
        if (actionElements) {
          columns.push("Actions");
        }

        originalData?.forEach((data) => {
          let newData = {};
          columns.map((column) => {
            if (data[column] !== null && columnMapping[column]) {
              if (columnValueMapping && columnValueMapping[column]) {
                newData = {
                  ...newData,
                  [columnMapping[column]]:
                    columnValueMapping[column][data[column]],
                };
              } else {
                newData = { ...newData, [columnMapping[column]]: data[column] };
              }
            } else if (data[column] !== null && !columnMapping[column]) {
              if (columnValueMapping && columnValueMapping[column]) {
                newData = {
                  ...newData,
                  [column]: columnValueMapping[column][data[column]],
                };
              } else {
                newData = {
                  ...newData,
                  [column]: data[column],
                };
              }
            } else if (data[column] === null && columnMapping[column]) {
              newData = { ...newData, [[columnMapping[column]]]: "-" };
            } else if (data[column] === null) {
              newData = { ...newData, [column]: "-" };
            } else if (actionElements) {
              if (data["deleted_at"]) {
                newData = {
                  ...newData,
                  [column]: actionElements(newData, true),
                };
              } else {
                newData = {
                  ...newData,
                  [column]: actionElements(newData, false),
                };
              }
            }
            return column;
          });
          transformedData.push(newData);
        });
      }

      return resolve({ transformedData });
    } catch (error) {
      return reject({ transformedData: null });
    }
  });
}
