import { Review } from "../types/reviews";
import { PRODUCT_REVIEWS } from "../data/reviews";

class ReviewService {
  private static instance: ReviewService;

  private constructor() {}

  static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService();
    }
    return ReviewService.instance;
  }

  async addReview(
    productId: string,
    userId: string,
    userName: string,
    rating: number,
    comment: string,
    images?: string[]
  ): Promise<Review> {
    const newReview: Review = {
      id: `rev${Date.now()}`,
      userId,
      userName,
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
      images,
    };

    // Ajouter l'avis à la liste des avis du produit
    if (!PRODUCT_REVIEWS[productId]) {
      PRODUCT_REVIEWS[productId] = [];
    }
    PRODUCT_REVIEWS[productId].unshift(newReview);

    return newReview;
  }

  async getProductReviews(productId: string): Promise<Review[]> {
    return PRODUCT_REVIEWS[productId] || [];
  }

  async markReviewAsHelpful(reviewId: string): Promise<void> {
    // Parcourir tous les produits pour trouver l'avis
    Object.values(PRODUCT_REVIEWS).forEach((reviews) => {
      const review = reviews.find((r) => r.id === reviewId);
      if (review) {
        review.helpful += 1;
      }
    });
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    const userReviews: Review[] = [];
    Object.values(PRODUCT_REVIEWS).forEach((reviews) => {
      reviews.forEach((review) => {
        if (review.userId === userId) {
          userReviews.push(review);
        }
      });
    });
    return userReviews;
  }
}

export default ReviewService.getInstance();
