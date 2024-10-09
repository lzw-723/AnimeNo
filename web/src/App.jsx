import './App.css';
import {createEffect, createSignal, For} from "solid-js";

const [bangumi, setBangumi] = createSignal([]);
const [day, setDays] = createSignal(0);
const [todayBangumi, setTodayBangumi] = createSignal([]);

function fetchBangumi() {
    return fetch("/api/v1/bangumi")
        .then((response) => {
            return response.json();
        }).then(data => {
            return data;
        });
}

function fetchQuote() {
    return fetch("/api/v1/quote")
        .then((response) => {
            return response.json();
        }).then(data => {
            return data;
        });
}

fetchBangumi().then(data => {
    console.log(data);
    setBangumi(data);
})


const App = () => {
    createEffect(() => {
        setTodayBangumi(bangumi()[['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][day()]])
    })
    return (<>

        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">AnimeNo</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Link</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>

        <div className="">
            <div className="flex flex-wrap gap-1">
                <button className={"btn " + (day() != 0 ? 'btn-ghost' : '')} onClick={() => setDays(0)}>周日
                </button>
                <button className={"btn " + (day() != 1 ? 'btn-ghost' : '')} onClick={() => setDays(1)}>周一
                </button>
                <button className={"btn " + (day() != 2 ? 'btn-ghost' : '')} onClick={() => setDays(2)}>周二
                </button>
                <button className={"btn " + (day() != 3 ? 'btn-ghost' : '')} onClick={() => setDays(3)}>周三
                </button>
                <button className={"btn " + (day() != 4 ? 'btn-ghost' : '')} onClick={() => setDays(4)}>周四
                </button>
                <button className={"btn " + (day() != 5 ? 'btn-ghost' : '')} onClick={() => setDays(5)}>周五
                </button>
                <button className={"btn " + (day() != 6 ? 'btn-ghost' : '')} onClick={() => setDays(6)}>周六
                </button>
            </div>

            <br/>
            <div class="grid md:grid-cols-4 grid-cols-1 gap-4">
                <For each={todayBangumi()}>
                    {(item, index) => <div className="card bg-base-100 grow shadow-xl m-1">
                        <div className="card-body">
                            <h2 className="card-title">{item.localeTitle}</h2>
                            <span className="">{item.title}</span>
                            <a href={item.officialSite} className="btn">去追番</a>
                            <p className="card-text">{item.type}</p>
                            <p>{() => new Date(Date.parse(item.begin)).toLocaleString()}开播</p>
                            <p>每周{() => ["日", "一", "二", "三", "四", "五", "六"][new Date(Date.parse(item.begin)).getDay()]}</p>
                        </div>
                    </div>}
                </For>
            </div>
        </div>
        <footer className="footer bg-neutral text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
                <p>
                    <span>Copyright © {new Date().getFullYear()} - All right reserved</span>
                    <br/>
                    <span>Powered by falcon & solidjs</span>
                </p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            </nav>
        </footer>
    </>);
};

export default App;
