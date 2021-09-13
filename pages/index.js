import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS Meetups</title>
        <meta name="description" content="description..." />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  );
};

//This code doesnt go to the client site
// export const getStaticProps = async () => {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 10,
//   };
// };

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://user:An7YcGYxAqSQrzwj@cluster0.t2dcl.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
};

export default HomePage;
