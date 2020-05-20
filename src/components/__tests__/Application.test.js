 
import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, queryByText, queryByAltText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);


it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"))
  fireEvent.click(getByText("Tuesday"))
  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));
  const savingCheck = () => expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));


  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));


  expect(getByText(appointment, "Are you sure you would like to delete this appointment?")).toBeInTheDocument();

  fireEvent.click(getByText(appointment, "Confirm"));

  const deleteCheck = () => expect(getByText(appointment, "Saving")).toBeInTheDocument();

  waitForElement(() => getByAltText(appointment, "Add"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

  const { container, debug } = render(<Application />);


  await waitForElement(() => getByText(container, "Archie Cohen"));


  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(getByAltText(appointment, "Edit"));

  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));


  fireEvent.click(getByText(appointment, "Save"));

  const savingCheck = () => expect(getByText(appointment, "Saving")).toBeInTheDocument();

  waitForElement(() => getByAltText(appointment, "Edit"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
})

it("shows the save error when failing to save an appointment", async () => {

  const { container, debug } = render(<Application />);


  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
  axios.put.mockRejectedValueOnce();
  
  fireEvent.click(getByText(appointment, "Save"));

  
  return () => expect(getByText(appointment, "Error in saving appointment.")).toBeInTheDocument();
});

it("shows the delete error when failing to cancel an appointment", async () => {

  const { container, debug } = render(<Application />);


  await waitForElement(() => getByText(container, "Archie Cohen"));


  axios.delete.mockRejectedValueOnce();


  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  return () => expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
})