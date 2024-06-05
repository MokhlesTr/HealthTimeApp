import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import classNames from "classnames";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/consts/navigation";

const linkClasses =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-full bg-neutral-900 w-60 px-3 flex flex-col  text-white overflow-y-auto fixed">
      <div
        className={classNames(
          "text-neutral-100 font-semibold pl-4 pt-10 text-xl",
          { "hidden lg:inline": pathname.startsWith("/admin") }
        )}
      >
        <span className="lg:inline hidden">Admin Page</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} pathname={pathname} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} pathname={pathname} />
        ))}
        <Link
          to="/"
          className={classNames("text-red-500 cursor-pointer", linkClasses)}
        >
          <span className="text-3xl lg:text-xl">
            <HiOutlineLogout />
          </span>
          <span className="lg:inline hidden">Logout</span>
        </Link>
      </div>
    </div>
  );
}

function SidebarLink({ item, pathname }) {
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "text-white" : "text-neutral-400",
        linkClasses
      )}
    >
      <span className="text-3xl lg:text-xl">{item.icon}</span>
      <span className="lg:inline hidden">{item.label}</span>
    </Link>
  );
}
