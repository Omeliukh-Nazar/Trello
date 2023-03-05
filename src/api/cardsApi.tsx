import CardM from "../models/Card";
import api from "./api";

export const getAllCards = async () => {
  return await api.get(`Card`).catch((error) => {
    throw new Error(error);
  });
};

export const getAllCardsByColumn = async (columnId: number) => {
  return await api.get(`Card/${columnId}`).catch((error) => {
    throw new Error(error);
  });
};

export const getCardsByBoard = async (boardId: number) => {
  return await api.get(`Card/GetCardsByBoard/${boardId}`).catch((error) => {
    throw new Error(error);
  });
};

export const getCardById = async (id: number) => {
  return await api.get(`GetCard/${id}`).catch((error) => {
    throw new Error(error);
  });
};
export const getCardsByColumn = async (id: number) => {
  return await api.get(`Card/GetCardsByColumn/${id}`).catch((error) => {
    throw new Error(error);
  });
};

export const AddCard = async (Card: CardM) => {
  return await api.post(`Card/AddCard`, Card).catch((error) => {
    throw new Error(error);
  });
};
export const editCard = async (cardM: CardM) => {
return await api.put(`Card/EditCardName`, cardM).catch((error) => {
  throw new Error(error);
});
};
export const deleteCard = async (cardId: number) => {
    return await api.remove(`Card/DeleteCard/${cardId}`).catch((error) => {
        throw new Error(error);
    });
};

export const updateCards = async (cards: CardM[]) => {
  return await api.put(`Card/UpdateCards`, cards).catch((error) => {
    throw new Error(error);
  });
};
