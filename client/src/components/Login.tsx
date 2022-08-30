import { useEffect } from 'react';
import redditLogo from '../assets/reddit-icon-snoo.png';

const Login:React.FC = () => {

    const CLIENT_ID = 'eVR6XO9MRO7sTjbt72Fn8w';
    const CLIENT_SECRET = 'Myz1KXXYJVRTx1-klXYwu29ztgIeGQ'
    const RANDOM_STRING = 'secret';
    const URI = 'http://localhost:3000/';

    useEffect(()=>{
        if(window.location.search) {
            console.log("There's something else going on here...")
            const code = new URLSearchParams(window.location.search).get('code')
            sendCode(code).then(r=>console.log(r))
        } else {
            console.log("Nothing to see here...")
        }
        return () => console.log("Cleanup")
    }, [])

    async function sendCode(code:any){
        return await fetch('http://localhost:3001/trove/auth', {
            method: "GET",
            headers: {code}
        }).then(r => r.json())
    }

    return (
        <div className="w-1/4 h-1/2 bg-slate-800 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10">
            <h2 className="text-4xl font-medium text-yellow-50 text-center">Log in</h2>
            <button className=" bg-[#ff4300] px-4 py-2 rounded text-slate-50 font-bold flex items-center absolute bottom-10 left-1/2 -translate-x-1/2 drop-shadow-md active:bg-[#a42900]" 
                onClick={()=>{
                    window.location.href = 'https://www.reddit.com/api/v1/authorize?client_id=eVR6XO9MRO7sTjbt72Fn8w&response_type=code&state=RANDOM_STRING&redirect_uri=http://localhost:3000/&duration=temporary&scope=history+identity+read'
                }}>
                <span className='px-2 text-lg'>Login with Reddit</span>
                <img  className="w-10" src={redditLogo}/>
            </button>
        </div>
    )
}

export default Login