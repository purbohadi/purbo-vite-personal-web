import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from 'emailjs-com';
import Form from '../../../src/components/Form';

// Mock emailjs
jest.mock('emailjs-com', () => ({
  send: jest.fn()
}));

// Mock environment variables
const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    VITE_SERVICE_ID: 'test-service',
    VITE_TEMPLATE_ID: 'test-template',
    VITE_USER_ID: 'test-user'
  };
});

afterEach(() => {
  process.env = originalEnv;
  jest.clearAllMocks();
});

describe('Form', () => {
  const mockEmailjs = emailjs as jest.Mocked<typeof emailjs>;
  const setup = () => {
    const utils = render(<Form darkMode={false} />);
    const nameInput = screen.getByPlaceholderText('Your name');
    const emailInput = screen.getByPlaceholderText('name@mail.com');
    const messageInput = screen.getByPlaceholderText('Your message');
    const submitButton = screen.getByText('Send');
    return {
      nameInput,
      emailInput,
      messageInput,
      submitButton,
      ...utils,
    };
  };

  it('renders all form elements', () => {
    const { nameInput, emailInput, messageInput, submitButton } = setup();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('updates input values on change', async () => {
    const { nameInput, emailInput, messageInput } = setup();
    
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(messageInput).toHaveValue('Test message');
  });

  it('validates email format', async () => {
    const { emailInput, submitButton } = setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Fill all information.');
    alertMock.mockRestore();
  });

  it('requires all fields to be filled', async () => {
    const { submitButton } = setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('Fill all information.');
    alertMock.mockRestore();
  });

  it('submits form successfully', async () => {
    const { nameInput, emailInput, messageInput, submitButton } = setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    mockEmailjs.send.mockResolvedValueOnce({ status: 200, text: 'OK' });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Test message');
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockEmailjs.send).toHaveBeenCalledWith(
        'test-service',
        'test-template',
        {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message'
        },
        'test-user'
      );
      expect(alertMock).toHaveBeenCalledWith('Message sent successfully!');
    });

    alertMock.mockRestore();
  });

  it('handles submission failure', async () => {
    const { nameInput, emailInput, messageInput, submitButton } = setup();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
    mockEmailjs.send.mockRejectedValueOnce(new Error('Failed to send'));

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Test message');
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('Failed to send message. Please try again later.');
    });

    alertMock.mockRestore();
  });

  it('applies dark mode styles when enabled', () => {
    render(<Form darkMode={true} />);
    const form = screen.getByText('Feel free to contact me to collaborate, or just to chat!');
    expect(form).toHaveClass('text-white');
  });
}); 