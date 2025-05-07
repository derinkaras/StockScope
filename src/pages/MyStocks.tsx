import {userData} from "../tempUserData.ts";

function MyStocks() {

    return (
    <>
        <div className="flex flex-col mt-8">
            <div className="flex flex-col gap-3 my-4">
                <h1 className="text-2xl">📊 Stock Tracking for Smart Investors!</h1>
                <h1 className="text-xl mt-3">Try   <span className="bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] bg-clip-text text-transparent">StockScope</span> and start …</h1>
                <h2>✅ Tracking the stocks you care about</h2>
                <h2>✅ Getting real-time news & sentiment alerts</h2>
                <h2>✅ Making smarter buy/sell decisions</h2>

            </div>
            <div className="text-2xl font-bold flex flex-row gap-2 mt-8">
                <p>
                    My Stocks
                </p>
                <span className = "text-gray-500">{Object.keys(userData).length}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {Object.entries(userData).map(([key, value]) => {
                    console.log("price: ", value.price)
                    return (
                        <div className="bg-border-primary rounded-xl p-4 h-52 flex flex-col hover:scale-98 hover:cursor-pointer hover:shadow-md shadow-border-highlight transition-transform duration-200 " key={key}>
                            <div className="flex flex-1 flex-col">
                                <h1 className="text-link text-2xl">{key}</h1>
                                <h2>{value.name}</h2>
                                <h1 className= {`${ (value!.price ?? 0) < 0 ? "text-red-500": "text-green-500"} my-2`}>$ {value.price}</h1>
                                <p className="text-base">{value.summary}</p>
                            </div>
                            <a className="text-link hover:underline hover:cursor-pointer mt-3"> Manage Alerts</a>
                        </div>
                    )
                })}
            </div>
        </div>

    </>
    )
}

export default MyStocks
