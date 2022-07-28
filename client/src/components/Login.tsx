import redditLogo from '../assets/reddit-icon.png';

const Login = () => {

    return (
        <div className="bg-slate-800 h-96 w-1/2 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10">
            <h1 className="text-slate-50 text-4xl font-lato text-center">Login</h1>
            <button className="flex items-center justify-between text-slate-50 font-semibold bg-reddit-orange px-4 py-1 rounded absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="pr-1">Login with Reddit</span>
                <img className="w-10" src={redditLogo}/>
                </button>
        </div>
    )
}

export default Login