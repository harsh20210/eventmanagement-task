import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import EventForm from "../../components/EventForm";

// Mock the uuid library
vi.mock('uuid', () => ({
  v4: () => 'test-uuid',
}));

describe("EventForm Component", () => {
  const mockAddItem = vi.fn();
  const mockHandleClose = vi.fn();

  test("renders correctly with default values", () => {
    render(<EventForm open={true} handleClose={mockHandleClose} addItem={mockAddItem} defaultValues={null} />);

    // Check if form fields are rendered
    expect(screen.getByPlaceholderText("Event Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Capacity")).toBeInTheDocument();
  });

  test("displays validation errors when submitting empty form", async () => {
    render(<EventForm open={true} handleClose={mockHandleClose} addItem={mockAddItem} defaultValues={null} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Event Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Date and Time are required")).toBeInTheDocument();
    expect(await screen.findByText("Location is required")).toBeInTheDocument();
    expect(await screen.findByText("Capacity is required")).toBeInTheDocument();
  });

  test("submits form with valid data", () => {
    render(<EventForm open={true} handleClose={mockHandleClose} addItem={mockAddItem} defaultValues={null} />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText("Event Name"), { target: { value: "Test Event" } });
    fireEvent.change(screen.getByPlaceholderText("Location"), { target: { value: "Test Location" } });
    fireEvent.change(screen.getByPlaceholderText("Capacity"), { target: { value: "100" } });
    fireEvent.change(screen.getByPlaceholderText("Capacity"), { target: { value: "100" } });
    fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2024-09-17T10:30" } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Check if addItem was called with the correct data
    expect(mockAddItem).toHaveBeenCalledWith({
      id: 'test-uuid',
      eventName: "Test Event",
      location: "Test Location",
      capacity: 100,
      date: "2024-09-17T10:30",
      description: "",
    });

    // Check if the form is closed after submission
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
