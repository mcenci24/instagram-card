export default function handler(req, res) {
  const data = {
    post: {
      id: 1,
      title: "Spring Break Photo Dump",
      description:
        "Florida Spring Break 2026 ",
      author: {
        name: "Maddox Cenci",
        image: "https://cdn.pixabay.com/photo/2015/11/17/13/13/puppy-1047521_1280.jpg",
        userSince: "2016",
        channelName: "mcenci24",
      },
      images: [
        {
          id: 1,
          name: "The entrance to my resort",
          dateTaken: "March 6, 2026",
          thumbnail: "https://t3.ftcdn.net/jpg/05/21/29/50/360_F_521295026_xZ6shwxjg2cUYdtwIp2cohzJZeEhuL0z.jpg",
          full: "https://t3.ftcdn.net/jpg/05/21/29/50/360_F_521295026_xZ6shwxjg2cUYdtwIp2cohzJZeEhuL0z.jpg",
        },
        {
          id: 2,
          name: "Outside of our room",
          dateTaken: "March 6, 2026",
          thumbnail: "https://mrsoaroundtheworld.com/wp-content/uploads/2020/09/luxury-hotel-florida-keys-isla-bella.jpg",
          full: "https://mrsoaroundtheworld.com/wp-content/uploads/2020/09/luxury-hotel-florida-keys-isla-bella.jpg",
        },
        {
          id: 3,
          name: "Beachfront",
          dateTaken: "March 7, 2026",
          thumbnail: "https://people.com/thmb/CGg3krlcgGokpNPFCklhkxaFAEo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(737x303:739x305)/florida-beach-092024-tout-ddbd9471aabc444cbd5740e665657936.jpg",
          full: "https://people.com/thmb/CGg3krlcgGokpNPFCklhkxaFAEo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(737x303:739x305)/florida-beach-092024-tout-ddbd9471aabc444cbd5740e665657936.jpg",
        },
        {
          id: 4,
          name: "Resort drive in",
          dateTaken: "March 7, 2026",
          thumbnail: "https://www.travelandleisure.com/thmb/nB1a8IaGrEBYvzoh6KLx7wVOg64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/palm-beach-VISITFL0722-bde80a44aad84d93b1e29965a200b855.jpg",
          full: "https://www.travelandleisure.com/thmb/nB1a8IaGrEBYvzoh6KLx7wVOg64=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/palm-beach-VISITFL0722-bde80a44aad84d93b1e29965a200b855.jpg",
        },
        {
          id: 5,
          name: "A local shopping center",
          dateTaken: "March 7, 2026",
          thumbnail: "https://www.mustdo.com/wp-content/uploads/2019/02/Shops-and-restaurants-at-Miromar-Outlets-Fort-Myers-FL-1.jpg",
          full: "https://www.mustdo.com/wp-content/uploads/2019/02/Shops-and-restaurants-at-Miromar-Outlets-Fort-Myers-FL-1.jpg",
        },
        {
          id: 6,
          name: "More shops",
          dateTaken: "March 7, 2026",
          thumbnail: "https://jupitervacationrentals.com/wp-content/uploads/2023/09/driftwood-plaza-in-jupiter-florida-shops-1024x800.png",
          full: "https://jupitervacationrentals.com/wp-content/uploads/2023/09/driftwood-plaza-in-jupiter-florida-shops-1024x800.png",
        },
        {
          id: 7,
          name: "The beachfront bar",
          dateTaken: "March 8, 2026",
          thumbnail: "https://www.mustdo.com/wp-content/uploads/2019/07/OLearys-Waterfront-Tiki-Bar-Restaurant-Sarasota-Florida.jpg",
          full: "https://www.mustdo.com/wp-content/uploads/2019/07/OLearys-Waterfront-Tiki-Bar-Restaurant-Sarasota-Florida.jpg",
        },
        {
          id: 8,
          name: "We went to dinner at this seafood spot",
          dateTaken: "March 8, 2026",
          thumbnail: "https://www.mustdo.com/wp-content/uploads/2019/10/Three60-Market-restaurant-wine-shop-Naples-Florida.jpg",
          full: "https://www.mustdo.com/wp-content/uploads/2019/10/Three60-Market-restaurant-wine-shop-Naples-Florida.jpg",
        },
        {
          id: 9,
          name: "We went on jetskis the next morning",
          dateTaken: "March 9, 2026",
          thumbnail: "https://images.squarespace-cdn.com/content/v1/645d321ded708549137914f6/595b89dc-ad59-4a65-8d20-493b33658460/Boogies-Watersports-Jet-Ski-Rental-Destin-Florida.jpg",
          full: "https://images.squarespace-cdn.com/content/v1/645d321ded708549137914f6/595b89dc-ad59-4a65-8d20-493b33658460/Boogies-Watersports-Jet-Ski-Rental-Destin-Florida.jpg",
        },
        {
          id: 10,
          name: "Parasailing with my buddies",
          dateTaken: "March 9, 2026",
          thumbnail: "https://oceanreefresorts.icnd-cdn.com/images/blog/Parasailing-in-Destin-FL.jpg",
          full: "https://oceanreefresorts.icnd-cdn.com/images/blog/Parasailing-in-Destin-FL.jpg",
        },
        {
          id: 11,
          name: "We went to a steak dinner that night",
          dateTaken: "March 9, 2026",
          thumbnail: "https://elitetraveler.com/wp-content/uploads/sites/8/2017/05/baleen.png",
          full: "https://elitetraveler.com/wp-content/uploads/sites/8/2017/05/baleen.png",
        },
        {
          id: 12,
          name: "We woke up early and played golf",
          dateTaken: "March 10, 2026",
          thumbnail: "https://playinflorida.com/wp-content/uploads/2023/09/Florida-Golf-Thumb.jpg",
          full: "https://playinflorida.com/wp-content/uploads/2023/09/Florida-Golf-Thumb.jpg",
        },
        {
          id: 13,
          name: "Check out this aligator on the course!",
          dateTaken: "March 10, 2026",
          thumbnail: "https://content.wusa9.com/photo/2015/11/01/635617059914432552-635617050531380258-635616770614116360-B-1SigRWIAEttgp_2322772_ver1.0.jpg",
          full: "https://content.wusa9.com/photo/2015/11/01/635617059914432552-635617050531380258-635616770614116360-B-1SigRWIAEttgp_2322772_ver1.0.jpg",
        },
        {
          id: 14,
          name: "It was our final night, so we went to the beach",
          dateTaken: "March 10, 2026",
          thumbnail: "https://collinsvacationrentals.icnd-cdn.com/wp-content/uploads/2021/01/When-is-the-Best-Time-to-Visit-Florida-Beaches-2000x1200.jpg",
          full: "https://collinsvacationrentals.icnd-cdn.com/wp-content/uploads/2021/01/When-is-the-Best-Time-to-Visit-Florida-Beaches-2000x1200.jpg",
        },
        {
          id: 15,
          name: "Heading to our terminal to go home",
          dateTaken: "March 11, 2026",
          thumbnail: "https://cloudfront-us-east-1.images.arcpublishing.com/tbt/ZYMF7VA25BECOCKAOLNOMOOJU4.jpg",
          full: "https://cloudfront-us-east-1.images.arcpublishing.com/tbt/ZYMF7VA25BECOCKAOLNOMOOJU4.jpg",
        },
      ],
    
    },
  };

  res.status(200).json(data);
}