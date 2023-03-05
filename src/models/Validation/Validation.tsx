import { Tooltip } from "antd";
import {
  emptyInput,
  maxLength,
  incorrectDescription,
  incorrectTitle,
} from "../../components/Notifications/Messages";
import './Validation.css'

export const descriptionValidation = {
  BoardTitleContentSpace: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectTitle,
    },
    {
      max: 50,
      message: <Tooltip  overlayClassName="pop-up1"
      placement="top"
      visible={true}
      title="Must be less than 50 symbols!"
    />,
    },
    {
      required: true,
      message: <Tooltip overlayClassName="pop-up1"
      placement="top"
      visible={true}
      title="The input is required"
    />,
    },
  ],
  BoardTitle: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectTitle,
    },
    {
      max: 50,
      message: <Tooltip overlayClassName="pop-up"
      placement="right"
      visible={true}
      title="Must be less than 50 symbols!"
    />,
    },
    {
      required: true,
      message: <Tooltip overlayClassName="pop-up"
      placement="right"
      visible={true}
      title="The input is required"
    />,
    },
  ],
  TitleColumn: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectTitle,
    },
    {
      max: 50,
      message: maxLength(50),
    },
    {
      required: true,
      message: emptyInput(),
    },
  ],
  TitleCard: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectTitle,
    },
    {
      max: 200,
      message: maxLength(200),
    },
    {
      required: true,
      message: emptyInput(),
    },
  ],
  Description: [
    {
      pattern: /^\S*((?=(\S+))\2\s?)+$/,
      message: incorrectDescription,
    },
    {
      max: 1000,
      message: maxLength(1000),
    },
    {
      required: false,
      message: emptyInput(),
    },
  ],
};
