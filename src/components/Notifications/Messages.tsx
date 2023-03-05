import React from "react";

export const emptyInput = (title?: string) => {
  return title ? `Field ${title} is required` : `Field is required`;
};

export const maxLength = (len: number) => {
  return `Max length - ${len} symbols`;
};

const wrongFormat = "Please enter the correct format";

export const incorrectDescription =
  wrongFormat +
  ". The description cannot start, end with a space or contain more than one space in a row!";

export const incorrectTitle =
  wrongFormat +
  ". The title cannot start, end with a space or contain more than one space in a row!";
