export default function handler(req, res) {
  const data = {
    channel: {
      name: "Instagram",
    },
    items: [
      {
        id: 1,
        description: "Old Main",
        dateTaken: "August 26, 2025",
        images: {
          thumbnail: "",
          full:
            "https://live.staticflickr.com/8453/8023394371_649d41d2df_b.jpg",
        },
        author: {
          name: "Maddox Cenci",
          avatar:
            "https://upload.wikimedia.org/wikipedia/commons/4/43/Cute_dog.jpg",
          userSince: "2023",
          channelName: "Mcenci",
        },
      },
      {
        id: 2,
        description: "Rainforest",
        dateTaken: "March 18, 2026",
        images: {
          thumbnail:"",
          full: "https://i.natgeofe.com/n/d2f922a8-de1a-439a-b881-fa7c586bbeb5/rainforesthero_2x1.jpg",
        },
        author: {
          name: "Marco Delisi",
          avatar: "https://png.pngtree.com/thumb_back/fh260/background/20250423/pngtree-noisy-blue-fade-on-texture-background-jpg-image_17214388.jpg",
          userSince: "2022",
          channelName: "Explorer99",
        },
      },
      {
        id: 3,
        description: "My new dog!",
        dateTaken: "December 9, 2019",
        images: {
          thumbnail: "",
          full:
            "https://upload.wikimedia.org/wikipedia/commons/4/43/Cute_dog.jpg",
        },
        author: {
          name: "Brady Paliscak",
          avatar: "https://picsum.photos/id/237/200/200",
          userSince: "2021",
          channelName: "bradyyp13",
        },
      },
    ],
  };

  res.status(200).json(data);
}