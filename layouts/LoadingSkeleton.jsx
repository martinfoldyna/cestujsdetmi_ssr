import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LoadingSkeleton = () => {
  return (
    <SkeletonTheme>
      <h3>
        <Skeleton />
      </h3>
      <p>
        <Skeleton count={5} />
      </p>
    </SkeletonTheme>
  );
};

export default LoadingSkeleton;
