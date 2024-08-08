import React from "react";
function Label({ value }) {
	return (
		<label
			className="block mb-2 text-sm font-abeezee font-light"
			htmlFor={value}
		>
			{value.charAt(0).toUpperCase() + value.slice(1)}
		</label>
	);
}

export default Label;
