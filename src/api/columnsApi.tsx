import Column from "../models/Column";
import api from "./api";

const getAllColumnsByBoard = async (boardId: number) => {
  return await api.get(`Columns/Columns/${boardId}`).catch((error) => {
    throw new Error(error);
  });
};

const getColumnById = async (id: number) => {
  return (
    await api.get(`Columns/GetColumn/${id}`).catch((error) => {
      throw new Error(error);
    })
  ).data;
};

export const editColumnName = async (column: Column) => {
  return await api.put(`Columns/EditColumnName`, column).catch((error) => {
    throw new Error(error);
  });
};

const addColumn = async (Column: Column) => {
  return await api.post(`Columns/AddColumn`, Column).catch((error) => {
    throw new Error(error);
  });
};

const deleteColumnById = async (id: number) => {
  return await api.remove(`Columns/DeleteColumn/${id}`).catch((error) => {
    throw new Error(error);
  });
};

const updateColumns = async (Columns: Column[]) => {
  return await api.put(`Columns/UpdateColumns`, Columns).catch((error) => {
    throw new Error(error);
  });
};

export default {
  addColumn,
  getColumnById,
  editColumnName,
  getAllColumnsByBoard,
  deleteColumnById,
  updateColumns,
};
