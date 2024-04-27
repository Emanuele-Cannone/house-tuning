import { useEffect, useState } from "react";

const calculateRange = (vehicles: any, rowsPerPage: number) => {
    const range = [];
    const num = Math.ceil(vehicles.length / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
};

const sliceData = (vehicles: any, page: number, rowsPerPage: number) => {
return vehicles.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export const useTable = (vehicles: any, page: number, rowsPerPage: number) => {

    const [tableRange, setTableRange] = useState([]);
    const [slice, setSlice] = useState([]);
  
    useEffect(() => {
      const range = calculateRange(vehicles, rowsPerPage);
      setTableRange([...range] as any);
  
      const slice = sliceData(vehicles, page, rowsPerPage);
      setSlice([...slice] as any);
    }, [vehicles, setTableRange, page, setSlice]);
  };