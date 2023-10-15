import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NewMeetup() {
  const router = useRouter();

  const handleNewMeetup = async (meetupData) => {
    // console.log(meetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.push("/");
    // response.json().then((r) => console.log(r));
  };

  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta name="description" content="Fill this form to add a new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={handleNewMeetup} />
    </>
  );
}
