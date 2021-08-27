import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
	const [reservations, setReservations] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);

	const history = useHistory();

	useEffect(loadDashboard, [date]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		return () => abortController.abort();
	}

	const handlePreviousDate = () => {
		history.push(`dashboard?date=${previous(date)}`);
	};

	const handleNextDate = () => {
		history.push(`dashboard?date=${next(date)}`);
	};

	const handleTodayClick = () => {
		history.push(`dashboard?date=${today(date)}`);
	};

	const content = reservations.map((res, i) => (
		<div key={i} className="d-flex">
			<div className="col-2">
				<p>{res.first_name}</p>
			</div>
			<div className="col-2">
				<p>{res.last_name}</p>
			</div>
			<div className="col-2">
				<p>{res.mobile_number}</p>
			</div>
			<div className="col-2">
				<p>{res.reservation_time}</p>
			</div>
			<div className="col-2">
				<p>{res.people}</p>
			</div>
		</div>
	));

	return (
		<main className="text-center">
			<h1>Dashboard</h1>
			<h2 className="m-3">Today's Date is {today()}</h2>
			<div className="mb-3">
				<button
					className="btn btn-secondary mr-2"
					onClick={() => handlePreviousDate(date)}
				>
					previous
				</button>
				<button
					className="btn btn-secondary mr-2"
					onClick={() => handleTodayClick()}
				>
					today
				</button>
				<button
					className="btn btn-secondary mr-2"
					onClick={() => handleNextDate(date)}
				>
					next
				</button>
			</div>
			<div className="mb-3">
				<h4 className="mb-0">Reservations for date:</h4>
			</div>
			<div className="mb-3 ">
				<h4 className="mb-0">{date}</h4>
			</div>
			<ErrorAlert error={reservationsError} />
			<div className="d-flex">
				<div className="col-2">
					<h5>First Name</h5>
				</div>
				<div className="col-2">
					<h5>Last Name</h5>
				</div>
				<div className="col-2">
					<h5>Mobile number</h5>
				</div>
				<div className="col-2">
					<h5>Reservation Time</h5>
				</div>
				<div className="col-2">
					<h5>Party Size</h5>
				</div>
			</div>
			<div>{content}</div>
			{/* {JSON.stringify(reservations)} */}
		</main>
	);
}

export default Dashboard;
