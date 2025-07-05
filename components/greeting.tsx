'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

type GreetingProps = {
  onStartProject: () => void;
};

export function Greeting({ onStartProject }: GreetingProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center min-h-[60vh]"
    >
      <Card className="w-full max-w-md shadow-sm bg-background border rounded-2xl">
        <motion.div variants={itemVariants}>
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold mb-2 text-foreground">환영합니다!</h1>
            <p className="text-muted-foreground text-base">
              AI와 함께 당신의 프로젝트 팀을 쉽고 빠르게 빌딩해보세요.
            </p>
          </CardHeader>
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardContent className="mt-4 mb-1 text-center">
            <span className="block text-sm text-muted-foreground">
              시작하려면 아래 버튼을 눌러 새 프로젝트를 만들어보세요.
            </span>
          </CardContent>
        </motion.div>
        <motion.div variants={itemVariants}>
          <CardFooter className="flex justify-center">
            <Button
              size="lg"
              className="px-6 py-2 rounded-md font-semibold"
              onClick={onStartProject}
            >
              새 프로젝트 생성
            </Button>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}
