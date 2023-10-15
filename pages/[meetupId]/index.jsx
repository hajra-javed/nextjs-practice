import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

export default function Details({ details }) {
  return (
    <Fragment>
      <Head>
        <title>{details.title}</title>
        <meta name="description" content={details.description} />
      </Head>
      <MeetupDetails
        title={details.title}
        image={details.image}
        address={details.address}
        description={details.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hajra:abcd1234@cluster0.lnmb9at.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  const paths = meetups.map((m) => ({
    params: {
      meetupId: m._id.toString(),
    },
  }));
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://hajra:abcd1234@cluster0.lnmb9at.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  let meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });

  client.close();

  return {
    props: {
      details: {
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}
