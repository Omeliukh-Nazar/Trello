import Board from "../models/Board";
import api from "./api";

export const getAllBoards = async () => {
  return await api.get(`Boards`).catch((error) => {
    throw new Error(error);
  });
};

export const getBoardById = async (boardId: number) => {
  return await api.get(`Boards/GetBoard/${boardId}`).catch((error) => {
    throw new Error(error);
  });
};

export const addBoard = async (board: Board) => {
  return await api.post(`Boards/AddBoard`, board).catch((error) => {
    throw new Error(error);
  });
};

export const editBoardNameBoard = async (board: Board) => {
  return await api
    .put(`Boards/EditBoardName/${board.id}`, board)
    .catch((error) => {
      throw new Error(error);
    });
};

export const deleteBoardById = async (boardId: number) => {
  return await api.remove(`Boards/DeleteBoard/${boardId}`).catch((error) => {
    throw new Error(error);
  });
};
