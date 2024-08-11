import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../../../src/lib/utils";


import { useContext } from "react";
import ThemeContext from "../../../contexts/ThemeContext/ThemeContext";

const Switch = React.forwardRef(({ className, ...props }, ref) => {
	const { isDarkMode } = useContext(ThemeContext);

	return (
		<SwitchPrimitives.Root
			className={cn(
				"peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
				isDarkMode
					? "bg-gray-600 data-[state=checked]:bg-blue-400"
					: "bg-gray-200 data-[state=checked]:bg-blue-600",
				className
			)}
			{...props}
			ref={ref}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
					isDarkMode
						? "bg-white data-[state=checked]:bg-gray-800"
						: "bg-gray-800 data-[state=checked]:bg-white"
				)}
			/>
		</SwitchPrimitives.Root>
	);
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
