import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";
import { Link } from "react-router";

const HoverDropdown = () => {
	const { user } = useContext(AuthContext);


	return (
		<Link to={"/dashboard"}>
			{" "}
			<div className=" z-40">
				<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
					<div className="w-9 lg:w-12 rounded-full">
						<img src={user?.photoURL} />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default HoverDropdown;
