import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import Pet, { Pets } from "../models/Pet";
import { GetServerSideProps } from "next";

type Props = {
  pets: Pets[];
};

const IndexPage = ({ pets }: Props) => {
  return (
    <>
      {pets.map((pet) => {
        const id = pet._id as string;

        return (
          <div key={id}>
            <div className="card">
              <img src={pet.image_url} />
              <h5 className="pet-name">{pet.name}</h5>
              <div className="main-content">
                <p className="pet-name">{pet.name}</p>
                <p className="owner">Owner: {pet.owner_name}</p>

                <div className="likes info">
                  <p className="label">Likes</p>
                  <ul>
                    {pet.likes?.map((data, index) => (
                      <li key={index}>{data}</li>
                    ))}
                  </ul>
                </div>

                <div className="dislikes info">
                  <p className="label">Dislikes</p>
                  <ul>
                    {pet.dislikes?.map((data, index) => (
                      <li key={index}>{data}</li>
                    ))}
                  </ul>
                </div>

                <div className="btn-container">
                  <Link href={{ pathname: "/[id]/edit", query: { id } }}>
                    <button className="btn edit">Edit</button>
                  </Link>
                  <Link href={{ pathname: "/[id]", query: { id } }}>
                    <button className="btn view">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const result = await Pet.find({}).lean();
  const pets = JSON.parse(JSON.stringify(result));

  return { props: { pets } };
};

export default IndexPage;
