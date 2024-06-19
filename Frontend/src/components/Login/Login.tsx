
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";
const Login= ()=>{
    return(
        <div className=" flex items-center justify-center flex-row bg-white h-full">
        <div className='w-9/12 h-[87.5%] flex flex-row overflow-hidden '>
    
       <LoginLeft  />
       <LoginRight />
        </div>
        </div>
    )
}
export default Login;