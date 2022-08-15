import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { store } from './store';
import { AppTheme } from './theme';

export const AndersonApp = () => {
  return (
    <Provider store={ store }>
        <BrowserRouter>
        <AppTheme>
            <AppRouter/>
        </AppTheme>
        </BrowserRouter>
    </Provider>
  )
}
