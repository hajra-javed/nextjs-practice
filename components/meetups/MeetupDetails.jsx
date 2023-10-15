import classes from "./MeetupDetails.module.css";

export default function MeetupDetails(props) {
  return (
    <div className={classes.details}>
      <img src={props.image} alt="" />
      <h1>{props.title}</h1>
      <p>Address: {props.address}</p>
      <p>Description: {props.description}</p>
    </div>
  );
}
