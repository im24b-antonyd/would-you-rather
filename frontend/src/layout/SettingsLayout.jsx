import {Link, Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";

export default function SettingsLayout() {
    const allTabs = document.getElementsByClassName("settingsHeader")

    function activeTab(tabID) {
        const currentTab = document.getElementById(tabID)
        if (!currentTab.classList.contains("selected")) {
            for (let i = 0; i < allTabs.length; i++) {
                allTabs[i].classList.remove("selected");
            }
            currentTab.classList.add("selected");
        }
    }

    const location = useLocation()


    useEffect(() => {
        for (let i = 0; i < allTabs.length; i++) {
            console.log(`/${allTabs[1].id.replace("Settings", "")}`)
            const tabPath = "/settings/" + allTabs[i].id.replace("Settings", "").toLowerCase();

            if (location.pathname === tabPath) {
                activeTab(allTabs[i].id)
            } else if (location.pathname === "/settings") {
                activeTab("profileSettings")
            }
        }
    }, [location.pathname, allTabs]);

    return (
        <div className="flex ">
            <nav className="flex pt-4 h-screen flex-col border-r border-neutral-300"
            >
                <div className="p-8 pb-4">
                    <input className="border border-neutral-300 rounded-md p-2" placeholder="searchbar"/>
                </div>
                <Link id="profileSettings"
                      onClick={(event) => {
                          activeTab(event.target.id)
                      }}
                      onLoad={() => {
                          const firstTab = allTabs[0];
                          if (firstTab) {
                              firstTab.classList.add("selected");
                          }
                      }}
                      to="/settings/profile"
                      className="settingsHeader selected:bg-slate-100 text-neutral-500 selected:border-r-3 selected:border-blue-500 selected:text-black p-3 pr-8 pl-8 hover:bg-slate-100">Profile</Link>
                <Link id="accountSettings"
                      to="/settings/account"
                      onClick={(event) => {
                          activeTab(event.target.id)
                      }}
                      className="settingsHeader p-3 pr-8 pl-8 selected:bg-slate-100 text-neutral-500 selected:border-r-3 selected:border-blue-500 selected:text-black hover:bg-slate-100">
                    Account
                </Link>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}