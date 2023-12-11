import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTypedSelector } from "../../../hooks/useTypedSelector";


const Loader: React.FC = () => {

	const {isLoading} = useTypedSelector(store => store.isLoading);

	return (
		<>
		{isLoading && (
			<div>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={true}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
		) 
		}
		</>
	);
};

export default Loader;
