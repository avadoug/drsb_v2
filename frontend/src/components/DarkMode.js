import React, { useEffect, useMemo, useState } from "react";
import { ReactComponent as Sun } from "./Icons/Sun.svg";
import { ReactComponent as Moon } from "./Icons/Moon.svg";

export default function DarkMode() {
	const [darkMode, setDarkMode] = useState(false);
	const body = document.body;
	function setPreference() {
		const preference = localStorage.getItem("prefers");
		if (preference) {
			body.classList.add(preference);
		}
	}
	function toggle() {
		if (darkMode === !true) {
			body.classList.replace("dark", "light");
			
			localStorage.setItem("prefers", "light");
			setDarkMode(true);
		} else {
			body.classList.replace("light", "dark");
		
			localStorage.setItem("prefers", "dark");
			setDarkMode(false);
		}
	}
	useMemo(() => {
		setPreference();
	}, [setPreference]);
	return (
		<li className="nav-link" id="darkMode" onClick={toggle}>
			{darkMode === true ? <Moon /> : <Sun />}
			<span className="link-text">
				{darkMode === true ? "Dark Mode" : "Light Mode"}
			</span>
		</li>
	);
}
