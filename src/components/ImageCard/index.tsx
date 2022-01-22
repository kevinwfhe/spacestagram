/* eslint-disable camelcase */
import React from 'react';
import { MediaCard, VideoThumbnail } from '@shopify/polaris';
import { LikeIcon } from '..';

export type ImageCardProps = {
  title: string;
  liked: boolean;
  explanation: string;
  media_type: MediaType;
  url: string;
  onLike: Function;
  thumbnail_url?: string;
};

export default function ImageCard({
  title,
  liked,
  explanation,
  media_type,
  url,
  onLike,
  thumbnail_url,
}: ImageCardProps) {
  return (
    <MediaCard
      title={title}
      primaryAction={{
        content: liked ? 'Unlike' : 'Like',
        onAction: () => onLike(),
        icon: () => <LikeIcon liked={liked} />,
      }}
      description={explanation}
      portrait
    >
      {media_type === 'image' ? (
        <img
          alt={explanation}
          title={title}
          width="100%"
          height="100%"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          src={url}
        />
      ) : (
        <VideoThumbnail
          thumbnailUrl={thumbnail_url || ''}
          onClick={() => window.open(url)}
        />
      )}
    </MediaCard>
  );
}
