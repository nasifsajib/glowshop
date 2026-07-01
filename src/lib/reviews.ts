import { Review } from "@/types"

export const reviews: Review[] = [
  {
    id: "r1", userId: "u1", userName: "Sophia Chen", userAvatar: "",
    rating: 5, title: "Holy grail serum!",
    comment: "I've been using this serum for 3 weeks and the difference in my skin is incredible. My dark spots are fading and my skin looks so radiant!",
    date: "2026-06-15", likes: 234,
  },
  {
    id: "r2", userId: "u2", userName: "Maya Patel", userAvatar: "",
    rating: 5, title: "Worth every penny",
    comment: "This moisturizer is amazing. I have dry skin and this is the only cream that keeps my skin hydrated all day without feeling greasy.",
    date: "2026-06-12", likes: 189,
  },
  {
    id: "r3", userId: "u3", userName: "Emma Wilson", userAvatar: "",
    rating: 4, title: "Great lipstick, long lasting",
    comment: "The color is gorgeous and it really does last all day. It can be a bit drying after 8+ hours but overall fantastic.",
    date: "2026-06-10", likes: 145,
  },
  {
    id: "r4", userId: "u4", userName: "Olivia Johnson", userAvatar: "",
    rating: 5, title: "Game changer for my skin",
    comment: "The rice toner is amazing! My skin has never looked this bright and even. I can see results after just one week of use.",
    date: "2026-06-08", likes: 312,
  },
  {
    id: "r5", userId: "u5", userName: "Isabella Kim", userAvatar: "",
    rating: 5, title: "Best sunscreen ever",
    comment: "No white cast, lightweight, and works beautifully under my makeup. I've finally found my forever sunscreen!",
    date: "2026-06-05", likes: 267,
  },
  {
    id: "r6", userId: "u6", userName: "Aria Thompson", userAvatar: "",
    rating: 4, title: "Lovely body butter",
    comment: "The shea and vanilla scent is divine without being overpowering. My skin feels so soft and nourished after using it.",
    date: "2026-06-03", likes: 98,
  },
  {
    id: "r7", userId: "u7", userName: "Zara Ali", userAvatar: "",
    rating: 5, title: "Lashes look amazing",
    comment: "After 6 weeks of using this serum, my lashes are noticeably longer and thicker. So glad I tried this!",
    date: "2026-05-28", likes: 201,
  },
  {
    id: "r8", userId: "u8", userName: "Lily Martinez", userAvatar: "",
    rating: 5, title: "Perfect skin tint",
    comment: "Finally found a skin tint that matches my skin perfectly. The dewy finish gives me that glass skin look I've been wanting.",
    date: "2026-05-25", likes: 176,
  },
]

export const ratingBreakdown = {
  5: 65,
  4: 22,
  3: 8,
  2: 3,
  1: 2,
}
