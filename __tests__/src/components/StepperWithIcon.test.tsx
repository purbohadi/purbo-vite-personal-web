import { render, screen, fireEvent } from '@testing-library/react';
import StepperWithIcon from '../../../src/components/StepperWithIcon';
import { University } from '../../../src/types';

// Mock the universities data
const mockUniversities: University[] = [
  {
    logo: '/logo1.png',
    name: 'Uni 1',
    degreeType: 'Bachelor',
    degree: 'Computer Science',
    description: 'Test description 1',
    duration: '2020-2024',
    url: 'https://uni1.edu',
    countryFlag: '/flag1.png'
  },
  {
    logo: '/logo2.png',
    name: 'Uni 2',
    degreeType: 'Master',
    degree: 'Software Engineering',
    description: 'Test description 2',
    duration: '2024-2026',
    url: 'https://uni2.edu',
    countryFlag: '/flag2.png'
  },
  {
    logo: '/logo3.png',
    name: 'Uni 3',
    degreeType: 'PhD',
    degree: 'Computer Science',
    description: 'Test description 3',
    duration: '2026-2030',
    url: 'https://uni3.edu',
    countryFlag: '/flag3.png'
  }
];

jest.mock('../../../src/information', () => ({
  universities: [
    {
      logo: '/logo1.png',
      name: 'Uni 1',
      degreeType: 'Bachelor',
      degree: 'Computer Science',
      description: 'Test description 1',
      duration: '2020-2024',
      url: 'https://uni1.edu',
      countryFlag: '/flag1.png'
    },
    {
      logo: '/logo2.png',
      name: 'Uni 2',
      degreeType: 'Master',
      degree: 'Software Engineering',
      description: 'Test description 2',
      duration: '2024-2026',
      url: 'https://uni2.edu',
      countryFlag: '/flag2.png'
    },
    {
      logo: '/logo3.png',
      name: 'Uni 3',
      degreeType: 'PhD',
      degree: 'Computer Science',
      description: 'Test description 3',
      duration: '2026-2030',
      url: 'https://uni3.edu',
      countryFlag: '/flag3.png'
    }
  ]
}));

describe('StepperWithIcon', () => {
  const mockSetActiveStep = jest.fn();
  
  beforeEach(() => {
    mockSetActiveStep.mockClear();
  });

  const setup = (activeStep = 0, darkMode = false) => {
    return render(
      <StepperWithIcon
        activeStep={activeStep}
        setActiveStep={mockSetActiveStep}
        universities={mockUniversities}
        darkMode={darkMode}
      />
    );
  };

  it('renders all university steps', () => {
    setup();
    
    // Check for the presence of images without relying on alt text
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockUniversities.length);
    
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('src', mockUniversities[index].countryFlag);
    });
  });

  it('handles next button click', () => {
    setup(0);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(mockSetActiveStep).toHaveBeenCalled();
    // Check if the callback receives a function that would increment the step
    const callback = mockSetActiveStep.mock.calls[0][0];
    expect(callback(0)).toBe(1);
  });

  it('handles previous button click', () => {
    setup(1);
    
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    
    expect(mockSetActiveStep).toHaveBeenCalled();
    // Check if the callback receives a function that would decrement the step
    const callback = mockSetActiveStep.mock.calls[0][0];
    expect(callback(1)).toBe(0);
  });

  it('disables previous button on first step', () => {
    setup(0);
    
    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last step', () => {
    setup(mockUniversities.length - 1);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('applies dark mode styles when enabled', () => {
    setup(0, true);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button.className).toContain('bg-gray-300');
      expect(button.className).toContain('text-black');
    });
  });

  it('handles step selection', () => {
    setup(0);
    
    // Find and click the second step using data-testid
    const secondStep = screen.getByTestId('step-1');
    fireEvent.click(secondStep);
    
    expect(mockSetActiveStep).toHaveBeenCalledWith(1);
  });

  it('applies animation class to next button on first step', () => {
    setup(0);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton.className).toContain('animate-pulse');
  });

  it('removes animation class from next button after first step', () => {
    setup(1);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton.className).not.toContain('animate-pulse');
  });
}); 