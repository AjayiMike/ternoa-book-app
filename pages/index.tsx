import clsx from "clsx";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import Book from "../components/Book";
import styles from "../styles/Home.module.css";

const bookData = [
  {
    imgUri: "https://source.unsplash.com/random/50×50/?book",
    title: "Lorem ipsum dolor sit",
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
},
{
  imgUri: "https://source.unsplash.com/random/50×50/?book",
  title: "Lorem ipsum dolor sit",
  description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
},
{
  imgUri: "https://source.unsplash.com/random/50×50/?book",
  title: "Lorem ipsum dolor sit",
  description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
},
{
  imgUri: "https://source.unsplash.com/random/50×50/?book",
  title: "Lorem ipsum dolor sit",
  description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
},
{
  imgUri: "https://source.unsplash.com/random/50×50/?book",
  title: "Lorem ipsum dolor sit",
  description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
},
{
  imgUri: "https://source.unsplash.com/random/50×50/?book",
  title: "Lorem ipsum dolor sit",
  description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
},
{
  imgUri: "https://source.unsplash.com/random/50×50/?book",
  title: "Lorem ipsum dolor sit",
  description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, est vitae. Facere libero vero ut reprehenderit dolorum voluptas labore, quae dicta. Rerum et adipisci ipsa, delectus assumenda temporibus a itaque, incidunt eveniet fugit aperiam id facilis optio consequatur repudiandae cupiditate neque ullam? Itaque, impedit quibusdam? Eius animi voluptatem doloribus incidunt natus distinctio cum quisquam repudiandae nobis libero. Adipisci commodi obcaecati illum ad explicabo fugiat numquam nulla architecto eligendi vel. Quibusdam tempora necessitatibus iste facere culpa temporibus. Esse cumque corrupti reiciendis aperiam, praesentium illum explicabo inventore sint, voluptatem debitis aspernatur? Iusto at ullam voluptates assumenda ab alias animi voluptatibus pariatur velit.",
}
]

const Home: NextPage = () => {
    const tabs = {
        myBooks: "myBooks",
        allBooks: "allbooks",
    };
    const [activeTab, setActiveTab] = useState(tabs.allBooks);

    return (
        <div className="">
            <Head>
                <title>items</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="min-h-fit container mx-auto mt-12 px-4 sm:px-0">
                <div className="flex gap-6 border-b-2">
                    <button
                        onClick={() => setActiveTab(tabs.allBooks)}
                        id="allbooks"
                        className={clsx({
                            "border-b-4 border-black":
                                activeTab === tabs.allBooks,
                        })}
                    >
                        All books
                    </button>
                    <button
                        onClick={() => setActiveTab(tabs.myBooks)}
                        id="allbooks"
                        className={clsx({
                            "border-b-4 border-black":
                                activeTab === tabs.myBooks,
                        })}
                    >
                        My books
                    </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-8 mb-16">
                  {bookData.map((book, index) => <Book key = {index} {...book} /> )}
                </div>
            </main>
        </div>
    );
};

export default Home;
