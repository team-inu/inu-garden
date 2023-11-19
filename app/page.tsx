"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const emojiCharacters = ['😂', '🥶', '🥵', '🤣', '😭', '😘', '🥰', '😍', '😊', '😁', '🥺',  '🤗', '🤔',  '😳', '🥳', '😎']

export default function Home() {

  const flower = useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = useState(true);

  const emojiComponent = useMemo(() => {
    if (!isInView) {
      return (
        <div className="text-xl select-none animate-bounce" onClick={() => setIsInView(!isInView)}>
          <motion.div
            whileTap={{ scale: 3 }}
            whileHover={{ rotate: 360, scale: 2, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            
          >
            <div className="text-2xl">{emojiCharacters[Math.floor(Math.random()*emojiCharacters.length)]}</div>
          </motion.div>
        </div>
      );
    } else {
      return (
        <motion.div
          ref={flower}
          whileTap={{ scale: 3 }}
          whileHover={{ rotate: 360, scale: 2, transition: { duration: 0.3 } }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          drag
          dragConstraints={{}}
        >
          <div className="text-2xl">🌸</div>
        </motion.div>
      );
    }
  }, [isInView]);

  useEffect(() => {
    if (flower.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      });
      observer.observe(flower.current);
    }
  }, [isInView]);
  return (
    <div className="bg-black h-screen w-full flex justify-center items-center overflow-hidden">
      <div className="flex flex-row items-center space-x-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          whileTap={{ scale: 0.5 }}
        >
          <Image src="/images/shiba.svg" alt="shiba" width={80} height={80} />
        </motion.div>
        <div className="flex flex-col items-start">
          <div className="flex flex-row">
            <div className="font-bold text-2xl text-white select-none">
              <Link href={"/homepage"}>Inu【犬】</Link>
            </div>
            {emojiComponent}
          </div>
          <div className="text-zinc-400 animate-pulse select-none">
            のホームページです。
          </div>
        </div>
      </div>
    </div>
  );
}
