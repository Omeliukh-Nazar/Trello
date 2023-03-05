import { MenuProps } from "antd";
import { createStore, createHook, Action } from "react-sweet-state";
import { getAllBoards } from "../api/boardsApi";
import columnsApi from "../api/columnsApi";
import Board from "../models/Board";
import CardM from "../models/Card";
import Column from "../models/Column";

import {
  AddCard,
  editCard,
  getAllCards,
  deleteCard,
  getCardsByBoard,
  updateCards,
} from "../api/cardsApi";

type MenuItem = Required<MenuProps>["items"][number];

type State = {
  boards: Board[];
  columns: Column[];
  cards: CardM[];

  currentBoard: Board;
  currentColumn: Column;
  currentCard: CardM;

  menuItems: MenuItem[];
  addingBoardName: string;
  newBoard: string;
  editBoardName: string;

  isSideBarHidden: boolean;
  isInputPanelHidden: boolean;
  isEditCardModalHidden: boolean;
  isEditBoardModalShown: boolean;
  isAddColumnModalHidden: boolean;
};

const initialState: State = {
  isSideBarHidden: false,
  isEditCardModalHidden: false,
  menuItems: [],
  cards: [],
  currentCard: new CardM(),
  columns: [],
  isInputPanelHidden: true,
  addingBoardName: "",
  currentColumn: new Column(),
  newBoard: "",
  editBoardName: "",
  isEditBoardModalShown: false,
  boards: [],
  currentBoard: new Board(),
  isAddColumnModalHidden: false,
};

const actions = {
  getBoards:
    (): Action<State> =>
    async ({ setState }) => {
      const boards: Board[] = (await getAllBoards()).data;
      let items: MenuItem[] = [];
      boards.map((board: Board) => {
        items.push(getItem(board.title, board.id));
      });
      setState({
        boards: boards,
        menuItems: items.reverse(),
      });
    },

  setColumns:
    (columns: Column[]): Action<State> =>
    async ({ setState }) => {
      await columnsApi.updateColumns(columns);
      setState({
        columns: columns,
      });
    },

  setCards:
    (cards: CardM[], col: Column): Action<State> =>
    async ({ setState, getState }) => {
      let cols = getState().columns;
      cols[col.index].cards = cards;
      await updateCards(cards);
      setState({
        columns: cols,
      });
    },

  setInitialCurrentBoard:
    (): Action<State> =>
    async ({ setState, getState }) => {
      if (getState().boards.length > 0) {
        setState({
          currentBoard: getState().boards[0],
        });
      }
    },

  hideSideBar:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isSideBarHidden: !getState().isSideBarHidden,
      });
    },

  getColumnByBoard:
    (boardId: number): Action<State> =>
    async ({ setState }) => {
      let getColumns: Column[] = (
        await columnsApi.getAllColumnsByBoard(boardId)
      ).data;
      setState({ columns: getColumns });
    },

  getCardsByBoard:
    (boardId: number): Action<State> =>
    async ({ setState }) => {
      const getCards: CardM[] = (await getCardsByBoard(boardId)).data;
      setState({ cards: getCards });
    },

  openInputPanel:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isInputPanelHidden: !getState().isInputPanelHidden,
      });
    },

  setBoardName:
    (name: string): Action<State> =>
    ({ setState }) => {
      setState({
        addingBoardName: name,
        editBoardName: name
      });
    },

  setCurrentColumn:
    (columnId: number): Action<State> =>
    async ({ setState, getState }) => {
      const column = getState().columns.find(
        (column: Column) => column.id == columnId
      );
      setState({
        currentColumn: column,
      });
    },
  setCurrentCard:
    (cardId: number, column: Column): Action<State> =>
    async ({ setState, getState }) => {
      const card = column.cards.find((card: CardM) => card.id == cardId);
      setState({
        currentCard: card,
      });
    },

  addBoardName:
    (name: string): Action<State> =>
    ({ setState }) => {
      setState({
        newBoard: name,
      });
    },

  showEditBoardModal:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isEditBoardModalShown: !getState().isEditBoardModalShown,
      });
    },

  hideEditCardModal:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isEditCardModalHidden: !getState().isEditCardModalHidden,
      });
    },

  hideAddColumnModal:
    (): Action<State> =>
    ({ setState, getState }) => {
      setState({
        isAddColumnModalHidden: !getState().isAddColumnModalHidden,
      });
    },

  setCurrentBoard:
    (boardId: number): Action<State> =>
    async ({ setState, getState }) => {
      const board = getState().boards.find(
        (board: Board) => board.id === boardId
      );
      setState({
        currentBoard: board,
      });
    },

  createCard:
    (Card: CardM, column: Column): Action<State> =>
    async ({ setState }) => {
      debugger
      await createCard(Card)
      actions.setCards(column.cards, column);
    },

  editCard:
    (Card: CardM): Action<State> =>
    async ({ setState }) => {
      await editCardAction(Card);
      setState({
        cards: await getCards(),
      });
    },
  deleteCard:
    (cardId: number): Action<State> =>
    async () => {
      await deleteCardAction(cardId);
    },
};

const Store = createStore({
  initialState,
  actions,
});

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const getCards = async () => {
  const response = await getAllCards();
  return response.data;
};

const createCard = async (Card: CardM) => {
  const response = await AddCard(Card);
  return response.data;
};

const editCardAction = async (Card: CardM) => {
  const response = await editCard(Card);
  return response.data;
};
const deleteCardAction = async (cardId: number) => {
  const response = await deleteCard(cardId);
  return response.data;
};

export const useTable = createHook(Store);
