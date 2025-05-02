import React from 'react'

import 'assets/styles/reset.scss'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'
import store from './app/store/store'
import { CustomSnackBar } from './common/ui/CustomSnackBar/CustomSnackBar'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <CustomSnackBar />
        </Provider>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
)

reportWebVitals()
