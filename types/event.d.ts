type EventType = {
  id: number;
  avatar: ImageSourcePropType;
  username: string;
  image?: ImageSourcePropType;
  title: string;
  content: string;
  datePosted: Date | string;
  eta: string;
};
