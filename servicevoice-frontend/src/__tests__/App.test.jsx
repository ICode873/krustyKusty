import { render, screen } from '@testing-library/react'
import App from '../App.jsx'

test('renders header', () => {
  render(<App />)
  const headerElement = screen.getByText(/ServiceVoice/i)
  expect(headerElement).toBeInTheDocument()
})
