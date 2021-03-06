import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { storeFactory } from '../../tests/testUtils';

import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history
  };
}

const setup = (state = {}) => {
  const store = storeFactory(state);
  const { container } = renderWithRouter(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return container;
};

test('app rendering', () => {
  setup({ trck: { tracks: [] } });

  expect(screen).toBeDefined();
});

test('renders fallback message if tracks are not available', () => {
  setup({ trck: { tracks: [] } });

  const trackLabel = screen.getByText('Found: 0 tracks.');
  expect(trackLabel).toBeInTheDocument();
});

test('renders counting message if tracks are available', () => {
  setup({ trck: { tracks: ['100', '101'] } });

  const trackLabel = screen.getByText('Found: 2 tracks.');
  expect(trackLabel).toBeInTheDocument();
});
