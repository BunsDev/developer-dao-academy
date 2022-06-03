import Head from "next/head";
import Link from "next/link";
import { Heading, Box } from '@chakra-ui/react'
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface LessonProps {
  lessons: {
    frontMatter: any;
    slug: string;
  }[];
}

const Lessons: React.FC<LessonProps> = ({ lessons }) => {
  return (
    <>
      <Head>
        <title>D_D School of Code</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='p-4'>
        <Box p={8}>
          <Heading size='xl'>
            Lessons
          </Heading>
          <Box>
            {lessons.map((lesson: any, idx: number) => (
              <Link
                href={"/lessons/" + lesson.slug}
                passHref
              >
                <p key={lesson.title}>
                  Lesson {idx + 1}: {lesson.frontMatter.title}
                </p>
              </Link>
            ))}
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Lessons;

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("lessons"));
  const lessons = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("lessons", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });
  return {
    props: {
      lessons,
    },
  };
};