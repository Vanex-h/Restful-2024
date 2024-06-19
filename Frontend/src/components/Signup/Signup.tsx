
import SignupLeft from "./SignupLeft";
import SignupRight from "./SignupRight";
const Signup=()=>{
    return(

      <div className=" flex items-center justify-center flex-row bg-white h-full sm:text-sm">
        <div className='w-9/12 h-[87.5%] flex flex-row overflow-hidden '>
            <SignupRight />
            <SignupLeft />
            </div>
            </div>
    )
};
export default Signup;