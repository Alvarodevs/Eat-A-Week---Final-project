import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Card, Accordion, Button } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

export const DailyPlan = props => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container-fluid p-0">
			<Accordion>
				<Card>
					<Card.Header className="white-bg">
						<Accordion.Toggle as={Button} variant="link" eventKey="0">
							{"Breakfast"} <ChevronDown />
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="0">
						<Card.Body>{"Recipe name from display"}</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header className="white-bg">
						<Accordion.Toggle as={Button} variant="link" eventKey="1">
							{"Snack"} <ChevronDown />
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
						<Card.Body>{"Recipe name from display"}</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header className="white-bg">
						<Accordion.Toggle as={Button} variant="link" eventKey="2">
							{"Lunch"} <ChevronDown />
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
						<Card.Body>{"Recipe name from display"}</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header className="white-bg">
						<Accordion.Toggle as={Button} variant="link" eventKey="3">
							{"Snack"} <ChevronDown />
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="3">
						<Card.Body>{"Recipe name from display"}</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Card.Header className="white-bg">
						<Accordion.Toggle as={Button} variant="link" eventKey="4">
							{"Dinner"} <ChevronDown />
						</Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="4">
						<Card.Body>{"Recipe name from display"}</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</div>
	);
};
