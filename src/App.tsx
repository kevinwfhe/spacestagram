import { useEffect, useRef, useState } from "react";
import { Frame, Page } from "@shopify/polaris";
import axios from "axios";
import _ from "lodash";
import {
  ImageCard,
  TopBar,
  MemoizedSkeletonCard,
  createMasonryItem,
  ResponsiveMasonry,
} from "./components";
import { useAnimateOnScroll } from "./hooks";
import { APP_BANNER } from "./images";

// HOC wrap ImageCard and SkeletonCard with a Masonry item
const MasonryItemImageCard = createMasonryItem("li", ImageCard);
// use memoized component since the Skeleton will only render once
const MasonryItemSkeletonCard = createMasonryItem("li", MemoizedSkeletonCard);

type MediaType = "image" | "video";

type ImageProps = {
  title: string;
  liked: boolean;
  explanation: string;
  media_type: MediaType;
  url: string;
  thumbnail_url?: string;
};

function App() {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [bannerHeaderTransform, setBannerHeaderTransform] =
    useState<string>("");
  const [bannerHeaderOpacity, setBannerHeaderOpacity] = useState(1);
  const [showTopbarSubtitle, setShowTopbarSubtitle] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  /**
   * Data fetching hooks
   */
  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataWithLiked = await getImages();
      setTimeout(() => {
        setImages([...images, ...dataWithLiked]);
        setLoading(false);
      }, 2000); // To address the loading state
    })();
  }, []);

  useAnimateOnScroll(handleOnScroll, (timestamp, animationProps) => {
    if (animationProps) {
      const { bannerOutPercentage, bannerHeight } = animationProps;
      // modify the transform property and opacity of the banner header
      setBannerHeaderTransform(
        `translateY(${bannerOutPercentage * 0.4 * bannerHeight}px) scale(${
          bannerOutPercentage > 0.2 ? -0.5 * bannerOutPercentage + 1.1 : 1
        })`
      );
      setBannerHeaderOpacity(
        bannerOutPercentage > 0.6 ? -2.5 * bannerOutPercentage + 2.5 : 1
      );
      // set the classname of topbar subtitle
      setShowTopbarSubtitle(bannerOutPercentage > 0.8);
    }
  });

  /**
   * Send request to NASA api
   * @returns Images array with 'liked' status
   */
  const getImages = async (): Promise<ImageProps[]> => {
    const { data } = await axios.get<ImageProps[]>(
      "https://api.nasa.gov/planetary/apod?api_key=aZs7Z89YLKa1NydBXLjI9DmfbMRwtCLaGTUuDO9O&count=30&thumbs=true"
    );
    const dataWithLiked = data.map((item) => ({ ...item, liked: false }));
    return dataWithLiked;
  };

  /**
   * Scroll event handler
   * @param e Scroll event
   * @returns The dimension properties used in the animations
   */
  function handleOnScroll(e: Event): { [key: string]: any } | void {
    const rect = bannerRef?.current?.getBoundingClientRect();
    if (rect) {
      const { bottom, height } = rect;
      // the percentage of the invisible part of the banner;
      // goes from 0% to 100%
      const bannerOutPercentage = 1 - (bottom - 70) / height;
      // TODO: replace 70px with the real height of the topbar
      return {
        bannerOutPercentage,
        bannerHeight: height,
      };
    }
  }

  /**
   * Like or Unlike the Image
   * @param index target index in the images Array
   */
  const likedImage = (index: number): void => {
    const tempImages = [...images];
    tempImages[index].liked = !tempImages[index].liked;
    setImages(tempImages);
  };

  const topbarMarkup = (
    <TopBar
      title={"spacestagram"}
      subtitle={"Image-sharing From The Final Frontier"}
      showSubtitle={showTopbarSubtitle}
    />
  );

  const bannerMarkup = (
    <div ref={bannerRef} className="banner">
      <h1
        style={{
          transform: bannerHeaderTransform,
          opacity: bannerHeaderOpacity,
        }}
      >
        Image-sharing From The Final Frontier
      </h1>
      <img src={APP_BANNER} alt="A starring universe" />
    </div>
  );

  const pageMarkup = (
    <div className="page__wrapper">
      <Page title="Astronomy Picture of the Day">
        <ResponsiveMasonry>
          {images.map((img, index) => (
            <MasonryItemImageCard
              key={index}
              {...img}
              onLike={() => likedImage(index)}
            />
          ))}
          {loading &&
            Array(10)
              .fill(null)
              .map((item, index) => <MasonryItemSkeletonCard key={index} />)}
        </ResponsiveMasonry>
      </Page>
    </div>
  );

  return (
    <Frame topBar={topbarMarkup}>
      {bannerMarkup}
      {pageMarkup}
    </Frame>
  );
}

export default App;
