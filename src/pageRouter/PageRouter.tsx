import {Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage'

export default function PageRoutes() {
  return (<>
        <Routes>
          <Route
            path="/"
            element={ <MainPage />}
            />
          {/* <Route path="/event/:id" element={<EventDetails events={events} />} /> */}
        </Routes>
            </>
  )
}
