import { Story } from "@storybook/react";
import { Suspense } from "react";
import { Loader } from "@/shared/ui/Loader/Loader";

// декоратор, который позволяет не оборачивать в Suspense компоненты, которые лежат в глубине дерева
export const SuspenseDecorator = (StoryComponent: Story) => (
  <Suspense fallback={<Loader />}>
    <StoryComponent />
  </Suspense>
);
