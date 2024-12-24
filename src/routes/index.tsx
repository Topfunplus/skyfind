import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout/index'
import { Chat } from '../pages/Chat'
import {
  AdminDashboard,
  CreatePost,
  Home,
  Login,
  PostDetail,
  Register,
  UserProfile,
} from '../pages/index'

const Test = () => {
  return <>test</>
}

const AppRoutes: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="chat" element={<Chat />} />
            <Route path="register" element={<Register />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="admin/*" element={<AdminDashboard />} />
          </Route>
          <Route path="/back" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
