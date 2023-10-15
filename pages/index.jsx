import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups List</title>
        <meta
          name="description"
          content="Create and view a list of highly Reactive meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://hajra:abcd1234@cluster0.lnmb9at.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  let meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((m) => ({
        id: m._id.toString(),
        title: m.title,
        image: m.image,
        address: m.address,
      })),
    },
    revalidate: 10,
  };
}
