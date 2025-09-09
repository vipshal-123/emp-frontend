import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import UserProvider from './utils/UserProvider'
import Toast from './components/Toast'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Toast />
                    <UserProvider>
                        <App />
                    </UserProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
