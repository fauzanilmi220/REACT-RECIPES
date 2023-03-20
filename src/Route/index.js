import { BrowserRouter,Route,Routes,Navigate } from "react-router-dom"
import Home from '../Page/Home'
import Profile from '../Page/Profile/index.js'
import EditProfile from '../Page/Profile/edit.js'
import EditRecipe from '../Page/Edit'
import Add from '../Page/Add'
import Search from '../Page/Search/index.js'
import SearchDetail from '../Page/Search/detail.js'
import Register from '../Page/Auth/register'
import Login from '../Page/Auth/login'
import AuthChecker from '../Component/AuthChecker'

function App(){
    return(
            <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate to='home' replace="true"/>} />
                        <Route path='/home' element={<Home/>} />
                        <Route path='/profile' element={
                            <AuthChecker>
                                <Profile/>
                            </AuthChecker>
                        } />
                        <Route path='/profile/editProfile' element={
                            <AuthChecker>
                                <EditProfile/>
                            </AuthChecker>
                        } />
                        <Route path='/profile/editRecipe/:id' element={<EditRecipe/>} />
                        <Route path='/add' element={
                            <AuthChecker>
                                <Add/>
                            </AuthChecker>
                        } />
                        <Route path='/search' element={<Search/>} />
                        <Route path='/search/detail/:id' element={<SearchDetail/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/login' element={<Login/>} />
                    </Routes>
            </BrowserRouter>
    )
}

export default App