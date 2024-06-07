import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import TodoList from './features/todolist/todolist'
import Login from './features/login/login'
import { useAppSelector, useAppDispatch } from './app/hooks';
import { PageType } from './type/myType';
import { useEffect } from 'react';
import { selectUser } from './features/login/loginSlice';
import { LoginStatus } from './type/myType';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//         </span>
//       </header>
//     </div>
//   );
// }

function App() {

  const ProtectedRoute = () => {
    const userInfo = useAppSelector(selectUser);
    const isAuthenticated = userInfo.loginStatus == LoginStatus.LOGGED_IN;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/todolist" element={<TodoList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
